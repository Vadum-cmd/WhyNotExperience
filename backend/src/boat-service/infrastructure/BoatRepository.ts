import { pool } from '../../shared/database/connection';
import { IBoatRepository } from '../domain/IBoatRepository';
import { Boat, Experience, BoatFilters } from '../domain/Boat';

export class BoatRepository implements IBoatRepository {
  async findAll(filters?: BoatFilters): Promise<Boat[]> {
    let query = `
      SELECT b.*, u.id as host_id, u.name as host_name, u.email as host_email
      FROM boats b
      JOIN users u ON b.host_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.location) {
      query += ` AND b.location ILIKE $${paramIndex}`;
      params.push(`%${filters.location}%`);
      paramIndex++;
    }

    if (filters?.minPrice) {
      query += ` AND b.price >= $${paramIndex}`;
      params.push(filters.minPrice);
      paramIndex++;
    }

    if (filters?.maxPrice) {
      query += ` AND b.price <= $${paramIndex}`;
      params.push(filters.maxPrice);
      paramIndex++;
    }

    if (filters?.minRating) {
      query += ` AND b.rating >= $${paramIndex}`;
      params.push(filters.minRating);
      paramIndex++;
    }

    if (filters?.capacity) {
      query += ` AND b.capacity >= $${paramIndex}`;
      params.push(filters.capacity);
      paramIndex++;
    }

    query += ' ORDER BY b.rating DESC, b.created_at DESC';

    const result = await pool.query(query, params);
    return result.rows.map(row => ({
      ...row,
      images: row.images || [],
      host: {
        id: row.host_id,
        name: row.host_name,
        email: row.host_email,
      },
      availableDates: [], // Will be populated if needed
      experiences: [], // Will be populated if needed
    }));
  }

  async findById(id: string): Promise<Boat | null> {
    const result = await pool.query(
      `SELECT b.*, u.id as host_id, u.name as host_name, u.email as host_email
       FROM boats b
       JOIN users u ON b.host_id = u.id
       WHERE b.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return {
      ...row,
      images: row.images || [],
      host: {
        id: row.host_id,
        name: row.host_name,
        email: row.host_email,
      },
    };
  }

  async search(query: string, filters?: BoatFilters): Promise<Boat[]> {
    let sql = `
      SELECT b.*, u.id as host_id, u.name as host_name, u.email as host_email
      FROM boats b
      JOIN users u ON b.host_id = u.id
      WHERE (b.name ILIKE $1 OR b.model ILIKE $1 OR b.location ILIKE $1)
    `;
    const params: any[] = [`%${query}%`];
    let paramIndex = 2;

    if (filters?.location) {
      sql += ` AND b.location ILIKE $${paramIndex}`;
      params.push(`%${filters.location}%`);
      paramIndex++;
    }

    if (filters?.minPrice) {
      sql += ` AND b.price >= $${paramIndex}`;
      params.push(filters.minPrice);
      paramIndex++;
    }

    if (filters?.maxPrice) {
      sql += ` AND b.price <= $${paramIndex}`;
      params.push(filters.maxPrice);
      paramIndex++;
    }

    sql += ' ORDER BY b.rating DESC';

    const result = await pool.query(sql, params);
    return result.rows.map(row => ({
      ...row,
      images: row.images || [],
      host: {
        id: row.host_id,
        name: row.host_name,
        email: row.host_email,
      },
      availableDates: [], // Will be populated if needed
      experiences: [], // Will be populated if needed
    }));
  }

  async getExperiencesByBoatId(boatId: string): Promise<Experience[]> {
    const result = await pool.query(
      'SELECT * FROM experiences WHERE boat_id = $1 ORDER BY created_at',
      [boatId]
    );
    return result.rows;
  }

  async getAvailableDates(boatId: string, dateFrom?: string, dateTo?: string): Promise<string[]> {
    let query = `
      SELECT DISTINCT date::text
      FROM bookings
      WHERE boat_id = $1
        AND status IN ('pending', 'confirmed')
        AND date >= CURRENT_DATE
    `;
    const params: any[] = [boatId];

    if (dateFrom) {
      query += ` AND date >= $${params.length + 1}`;
      params.push(dateFrom);
    }

    if (dateTo) {
      query += ` AND date <= $${params.length + 1}`;
      params.push(dateTo);
    }

    const result = await pool.query(query, params);
    const bookedDates = new Set(result.rows.map((row: any) => row.date));

    // Generate available dates (next 30 days)
    const availableDates: string[] = [];
    const startDate = dateFrom ? new Date(dateFrom) : new Date();
    const endDate = dateTo ? new Date(dateTo) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      if (!bookedDates.has(dateStr)) {
        availableDates.push(dateStr);
      }
    }

    return availableDates;
  }
}

