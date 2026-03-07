import nodemailer from 'nodemailer';
import { Booking } from '../domain/Booking';

export class GovernmentalEmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendBookingConfirmation(booking: Booking, boatName: string, hostName: string): Promise<void> {
    const governmentalEmail = process.env.GOVERNMENTAL_EMAIL || 'government@example.com';

    const guestDocumentsList = booking.guestDocuments?.map((doc, index) => `
      Guest ${index + 1}:
      - Name: ${doc.name}
      - Document Type: ${doc.documentType}
      - Document Number: ${doc.documentNumber}
    `).join('\n') || 'No documents provided';

    const emailContent = `
BOAT RIDE CONFIRMATION REQUEST

Booking Details:
- Booking ID: ${booking.id}
- Boat: ${boatName}
- Host: ${hostName}
- Date: ${booking.date}
- Start Time: ${booking.startTime}
- End Time: ${booking.endTime}
- Duration: ${booking.duration} hours
- Number of Guests: ${booking.guests}

Guest Documents:
${guestDocumentsList}

Please confirm this boat ride booking.

This is an automated message from the BOAT booking system.
    `;

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: governmentalEmail,
        subject: `Boat Ride Confirmation Request - Booking ${booking.id}`,
        text: emailContent,
        html: `
          <h2>BOAT RIDE CONFIRMATION REQUEST</h2>
          <h3>Booking Details:</h3>
          <ul>
            <li><strong>Booking ID:</strong> ${booking.id}</li>
            <li><strong>Boat:</strong> ${boatName}</li>
            <li><strong>Host:</strong> ${hostName}</li>
            <li><strong>Date:</strong> ${booking.date}</li>
            <li><strong>Start Time:</strong> ${booking.startTime}</li>
            <li><strong>End Time:</strong> ${booking.endTime}</li>
            <li><strong>Duration:</strong> ${booking.duration} hours</li>
            <li><strong>Number of Guests:</strong> ${booking.guests}</li>
          </ul>
          <h3>Guest Documents:</h3>
          <pre>${guestDocumentsList}</pre>
          <p>Please confirm this boat ride booking.</p>
          <p><em>This is an automated message from the BOAT booking system.</em></p>
        `,
      });

      console.log(`Governmental email sent for booking ${booking.id}`);
    } catch (error) {
      console.error('Failed to send governmental email:', error);
      throw new Error('Failed to send confirmation email to governmental authorities');
    }
  }
}


