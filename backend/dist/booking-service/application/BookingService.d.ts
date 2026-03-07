import { IBookingRepository } from '../domain/IBookingRepository';
import { Booking, CreateBookingRequest } from '../domain/Booking';
export declare class BookingService {
    private bookingRepository;
    private emailService;
    constructor(bookingRepository: IBookingRepository);
    createBooking(bookingData: CreateBookingRequest, userId: string): Promise<Booking>;
    getBookingsByUserId(userId: string): Promise<(Booking & {
        boatName: string;
        experienceName: string;
    })[]>;
    getBookingById(id: string): Promise<Booking>;
    cancelBooking(id: string, userId: string): Promise<void>;
}
//# sourceMappingURL=BookingService.d.ts.map