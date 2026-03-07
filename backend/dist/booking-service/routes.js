"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const BookingService_1 = require("./application/BookingService");
const BookingRepository_1 = require("./infrastructure/BookingRepository");
const auth_1 = require("../shared/middleware/auth");
const router = (0, express_1.Router)();
exports.bookingRouter = router;
const bookingService = new BookingService_1.BookingService(new BookingRepository_1.BookingRepository());
router.post('/', auth_1.authenticate, async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body, req.user.id);
        res.status(201).json(booking);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/', auth_1.authenticate, async (req, res) => {
    try {
        const bookings = await bookingService.getBookingsByUserId(req.user.id);
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id', auth_1.authenticate, async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        res.json(booking);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
router.delete('/:id', auth_1.authenticate, async (req, res) => {
    try {
        await bookingService.cancelBooking(req.params.id, req.user.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//# sourceMappingURL=routes.js.map