import { pool } from '../../shared/database/connection';
import { IUserRepository } from '../domain/IUserRepository';
import { User, CreateUserRequest } from '../domain/User';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async create(userData: CreateUserRequest, passwordHash: string): Promise<User> {
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO users (id, email, password_hash, name, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      [id, userData.email, passwordHash, userData.name, userData.role]
    );
    return result.rows[0];
  }
}


