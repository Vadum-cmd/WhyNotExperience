import { Booking } from '../domain/Booking';
export declare class GovernmentalEmailService {
    private transporter;
    constructor();
    sendBookingConfirmation(booking: Booking, boatName: string, hostName: string): Promise<void>;
}
//# sourceMappingURL=GovernmentalEmailService.d.ts.map