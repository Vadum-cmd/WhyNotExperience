import { Router } from 'express';
import { BookingService } from './application/BookingService';
import { BookingRepository } from './infrastructure/BookingRepository';
import { authenticate, AuthRequest } from '../shared/middleware/auth';

const router = Router();
const bookingService = new BookingService(new BookingRepository());

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const booking = await bookingService.createBooking(req.body, req.user!.id);
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const bookings = await bookingService.getBookingsByUserId(req.user!.id);
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.json(booking);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    await bookingService.cancelBooking(req.params.id, req.user!.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export { router as bookingRouter };


