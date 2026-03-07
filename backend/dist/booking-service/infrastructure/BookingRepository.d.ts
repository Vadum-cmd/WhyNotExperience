import { IBookingRepository } from '../domain/IBookingRepository';
import { Booking, CreateBookingRequest } from '../domain/Booking';
export declare class BookingRepository implements IBookingRepository {
    create(bookingData: CreateBookingRequest, userId: string): Promise<Booking>;
    findById(id: string): Promise<Booking | null>;
    findByUserId(userId: string): Promise<Booking[]>;
    updateStatus(id: string, status: Booking['status']): Promise<Booking>;
    checkCapacity(boatId: string, date: string, startTime: string, duration: number): Promise<boolean>;
    private calculateEndTime;
}
//# sourceMappingURL=BookingRepository.d.ts.map