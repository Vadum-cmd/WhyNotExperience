"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const connection_1 = require("../../shared/database/connection");
const uuid_1 = require("uuid");
class BookingRepository {
    async create(bookingData, userId) {
        const id = (0, uuid_1.v4)();
        // Get experience price and duration
        const experienceResult = await connection_1.pool.query('SELECT price, duration FROM experiences WHERE id = $1', [bookingData.experienceId]);
        const experience = experienceResult.rows[0];
        if (!experience) {
            throw new Error('Experience not found');
        }
        const duration = experience.duration;
        const endTime = this.calculateEndTime(bookingData.startTime, duration);
        const totalPrice = experience.price * bookingData.guests;
        const result = await connection_1.pool.query(`INSERT INTO bookings (id, user_id, boat_id, experience_id, date, start_time, end_time, duration, guests, total_price, status, guest_documents, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
       RETURNING *`, [
            id,
            userId,
            bookingData.boatId,
            bookingData.experienceId,
            bookingData.date,
            bookingData.startTime,
            endTime,
            duration,
            bookingData.guests,
            totalPrice,
            'pending',
            JSON.stringify(bookingData.guestDocuments || []),
        ]);
        return result.rows[0];
    }
    async findById(id) {
        const result = await connection_1.pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
    async findByUserId(userId) {
        const result = await connection_1.pool.query('SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return result.rows;
    }
    async updateStatus(id, status) {
        const result = await connection_1.pool.query('UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *', [status, id]);
        return result.rows[0];
    }
    async checkCapacity(boatId, date, startTime, duration) {
        // Get boat capacity
        const boatResult = await connection_1.pool.query('SELECT capacity FROM boats WHERE id = $1', [boatId]);
        if (boatResult.rows.length === 0) {
            return false;
        }
        const capacity = boatResult.rows[0].capacity;
        // Calculate end time
        const endTime = this.calculateEndTime(startTime, duration);
        // Count booked guests for the same time slot
        const bookingResult = await connection_1.pool.query(`SELECT SUM(guests) as total_guests
       FROM bookings
       WHERE boat_id = $1
         AND date = $2
         AND status IN ('pending', 'confirmed')
         AND (
           (start_time <= $3 AND end_time > $3) OR
           (start_time < $4 AND end_time >= $4) OR
           (start_time >= $3 AND end_time <= $4)
         )`, [boatId, date, startTime, endTime]);
        const bookedGuests = parseInt(bookingResult.rows[0].total_guests || '0');
        return bookedGuests < capacity;
    }
    calculateEndTime(startTime, duration) {
        const [hours, minutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes, 0, 0);
        startDate.setHours(startDate.getHours() + duration);
        return `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    }
}
exports.BookingRepository = BookingRepository;
//# sourceMappingURL=BookingRepository.js.map