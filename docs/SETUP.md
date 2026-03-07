# Setup Guide

## Environment Variables

### Backend (.env)

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=boat_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Email (for governmental notifications)
GOVERNMENTAL_EMAIL=government@example.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Database Setup

1. Create PostgreSQL database:
   ```bash
   createdb boat_db
   ```

2. Run migrations:
   ```bash
   cd backend
   npm run build
   npm run migrate
   ```

3. (Optional) Seed with sample data:
   ```bash
   psql boat_db < backend/src/database/seed.sql
   ```

## Email Configuration

For governmental email notifications, configure SMTP settings:

### Gmail Setup
1. Enable 2-factor authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `SMTP_PASSWORD`

### Other SMTP Providers
Update `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD` accordingly.

## Running the Application

### Development Mode

1. Start backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start frontend (in another terminal):
   ```bash
   cd frontend
   npm start
   ```

### Production Build

1. Build backend:
   ```bash
   cd backend
   npm run build
   ```

2. Build frontend:
   ```bash
   cd frontend
   npm run build
   ```

3. Start backend:
   ```bash
   cd backend
   npm start
   ```

4. Serve frontend (using a static server like nginx or serve):
   ```bash
   npm install -g serve
   serve -s frontend/build
   ```

## Testing

### Test User Accounts

After seeding the database, you can use:
- Host: `host@example.com` / `password123`
- Guest: `guest@example.com` / `password123`

Note: Update password hashes in seed.sql with actual bcrypt hashes for production.

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists: `psql -l | grep boat_db`

### Email Not Sending
- Verify SMTP credentials
- Check firewall settings
- For Gmail, ensure App Password is used (not regular password)

### Port Already in Use
- Change `PORT` in backend `.env`
- Update `REACT_APP_API_URL` in frontend `.env` accordingly


