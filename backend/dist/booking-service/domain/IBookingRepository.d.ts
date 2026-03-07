import { Booking, CreateBookingRequest } from './Booking';
export interface IBookingRepository {
    create(bookingData: CreateBookingRequest, userId: string): Promise<Booking>;
    findById(id: string): Promise<Booking | null>;
    findByUserId(userId: string): Promise<Booking[]>;
    updateStatus(id: string, status: Booking['status']): Promise<Booking>;
    checkCapacity(boatId: string, date: string, startTime: string, duration: number): Promise<boolean>;
}
//# sourceMappingURL=IBookingRepository.d.ts.map