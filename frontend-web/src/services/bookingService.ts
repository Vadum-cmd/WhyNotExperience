import api from './api';

export interface Booking {
  id: string;
  boatId: string;
  boatName: string;
  experienceId: string;
  experienceName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CreateBookingRequest {
  boatId: string;
  experienceId: string;
  date: string;
  startTime: string;
  guests: number;
  guestDocuments?: {
    name: string;
    documentType: string;
    documentNumber: string;
  }[];
}

export const bookingService = {
  async createBooking(data: CreateBookingRequest): Promise<Booking> {
    const payload = {
      boat_id: data.boatId,
      experience_id: data.experienceId,
      date: data.date,
      start_time: data.startTime,
      guests: data.guests ?? 1,
      guest_documents: data.guestDocuments,
    };
    const response = await api.post('/bookings', payload);
    return response.data;
  },

  async getBookings(): Promise<Booking[]> {
    const response = await api.get('/bookings');
    return response.data;
  },

  async getBookingById(id: string): Promise<Booking> {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  async cancelBooking(id: string): Promise<void> {
    await api.delete(`/bookings/${id}`);
  },
};


