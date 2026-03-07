"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const GovernmentalEmailService_1 = require("../infrastructure/GovernmentalEmailService");
const connection_1 = require("../../shared/database/connection");
class BookingService {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
        this.emailService = new GovernmentalEmailService_1.GovernmentalEmailService();
    }
    async createBooking(bookingData, userId) {
        // Check capacity
        const experienceResult = await connection_1.pool.query('SELECT duration FROM experiences WHERE id = $1', [bookingData.experienceId]);
        const duration = experienceResult.rows[0]?.duration || 2;
        const hasCapacity = await this.bookingRepository.checkCapacity(bookingData.boatId, bookingData.date, bookingData.startTime, duration);
        if (!hasCapacity) {
            throw new Error('No capacity available for the selected time slot');
        }
        // Create booking
        const booking = await this.bookingRepository.create(bookingData, userId);
        // Get boat and host information for email
        const boatResult = await connection_1.pool.query(`SELECT b.name as boat_name, u.name as host_name
       FROM boats b
       JOIN users u ON b.host_id = u.id
       WHERE b.id = $1`, [bookingData.boatId]);
        if (boatResult.rows.length > 0) {
            const { boat_name, host_name } = boatResult.rows[0];
            // Send email to governmental authorities
            try {
                await this.emailService.sendBookingConfirmation(booking, boat_name, host_name);
                // Update booking status to confirmed after email is sent
                await this.bookingRepository.updateStatus(booking.id, 'confirmed');
                return { ...booking, status: 'confirmed' };
            }
            catch (error) {
                console.error('Failed to send governmental email, but booking created:', error);
                // Booking is still created but status remains pending
            }
        }
        return booking;
    }
    async getBookingsByUserId(userId) {
        const bookings = await this.bookingRepository.findByUserId(userId);
        // Enrich bookings with boat and experience names
        const enrichedBookings = await Promise.all(bookings.map(async (booking) => {
            const boatResult = await connection_1.pool.query('SELECT name FROM boats WHERE id = $1', [booking.boatId]);
            const experienceResult = await connection_1.pool.query('SELECT name FROM experiences WHERE id = $1', [booking.experienceId]);
            return {
                ...booking,
                boatName: boatResult.rows[0]?.name || 'Unknown Boat',
                experienceName: experienceResult.rows[0]?.name || 'Unknown Experience',
            };
        }));
        return enrichedBookings;
    }
    async getBookingById(id) {
        const booking = await this.bookingRepository.findById(id);
        if (!booking) {
            throw new Error('Booking not found');
        }
        return booking;
    }
    async cancelBooking(id, userId) {
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
exports.BookingService = BookingService;
//# sourceMappingURL=BookingService.js.map