"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const connection_1 = require("../../shared/database/connection");
const uuid_1 = require("uuid");
class UserRepository {
    async findByEmail(email) {
        const result = await connection_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    }
    async findById(id) {
        const result = await connection_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
    async create(userData, passwordHash) {
        const id = (0, uuid_1.v4)();
        const result = await connection_1.pool.query(`INSERT INTO users (id, email, password_hash, name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`, [id, userData.email, passwordHash, userData.name, userData.role]);
        return result.rows[0];
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map