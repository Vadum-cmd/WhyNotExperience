export interface Booking {
    id: string;
    userId: string;
    boatId: string;
    experienceId: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    guests: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    guestDocuments?: GuestDocument[];
    createdAt: Date;
    updatedAt: Date;
}
export interface GuestDocument {
    name: string;
    documentType: string;
    documentNumber: string;
}
export interface CreateBookingRequest {
    boatId: string;
    experienceId: string;
    date: string;
    startTime: string;
    guests: number;
    guestDocuments?: GuestDocument[];
}
//# sourceMappingURL=Booking.d.ts.map