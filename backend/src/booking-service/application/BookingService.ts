import { IBookingRepository } from '../domain/IBookingRepository';
import { Booking, CreateBookingRequest } from '../domain/Booking';
import { GovernmentalEmailService } from '../infrastructure/GovernmentalEmailService';
import { pool } from '../../shared/database/connection';

export class BookingService {
  private emailService: GovernmentalEmailService;

  constructor(private bookingRepository: IBookingRepository) {
    this.emailService = new GovernmentalEmailService();
  }

  async createBooking(bookingData: CreateBookingRequest, userId: string): Promise<Booking> {
    // Check capacity
    const experienceResult = await pool.query(
      'SELECT duration FROM experiences WHERE id = $1',
      [bookingData.experienceId]
    );
    const duration = experienceResult.rows[0]?.duration || 2;

    const hasCapacity = await this.bookingRepository.checkCapacity(
      bookingData.boatId,
      bookingData.date,
      bookingData.startTime,
      duration
    );

    if (!hasCapacity) {
      throw new Error('No capacity available for the selected time slot');
    }

    // Create booking
    const booking = await this.bookingRepository.create(bookingData, userId);

    // Get boat and host information for email
    const boatResult = await pool.query(
      `SELECT b.name as boat_name, u.name as host_name
       FROM boats b
       JOIN users u ON b.host_id = u.id
       WHERE b.id = $1`,
      [bookingData.boatId]
    );

    if (boatResult.rows.length > 0) {
      const { boat_name, host_name } = boatResult.rows[0];
      
      // Send email to governmental authorities
      try {
        await this.emailService.sendBookingConfirmation(booking, boat_name, host_name);
        // Update booking status to confirmed after email is sent
        await this.bookingRepository.updateStatus(booking.id, 'confirmed');
        return { ...booking, status: 'confirmed' as const };
      } catch (error) {
        console.error('Failed to send governmental email, but booking created:', error);
        // Booking is still created but status remains pending
      }
    }

    return booking;
  }

  async getBookingsByUserId(userId: string): Promise<(Booking & { boatName: string; experienceName: string })[]> {
    const bookings = await this.bookingRepository.findByUserId(userId);
    
    // Enrich bookings with boat and experience names
    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const boatResult = await pool.query('SELECT name FROM boats WHERE id = $1', [booking.boatId]);
        const experienceResult = await pool.query('SELECT name FROM experiences WHERE id = $1', [booking.experienceId]);
        
        return {
          ...booking,
          boatName: boatResult.rows[0]?.name || 'Unknown Boat',
          experienceName: experienceResult.rows[0]?.name || 'Unknown Experience',
        };
      })
    );
    
    return enrichedBookings;
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  async cancelBooking(id: string, userId: string): Promise<void> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await this.bookingRepository.updateStatus(id, 'cancelled');
  }
}

