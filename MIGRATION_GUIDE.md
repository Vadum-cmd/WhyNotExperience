# Migration Guide: Node.js to Rails 8

This guide helps you migrate from the Node.js backend to Rails 8.

## What Changed

### Backend
- **From**: Node.js/Express with TypeScript
- **To**: Ruby on Rails 8 API

### Frontend Structure
- **Web**: `frontend/` → `frontend-web/` (React - same code, updated API URL)
- **Mobile**: New `frontend-mobile/` (React Native)

## Migration Steps

### 1. Stop Old Backend
```bash
# Stop the Node.js backend if running
```

### 2. Set Up Rails Backend

```bash
cd backend-rails

# Install Ruby dependencies
bundle install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Create and migrate database
rails db:create
rails db:migrate

# Seed data
rails db:seed

# Start Rails server
rails server
```

### 3. Update React Web Frontend

The React frontend has been moved to `frontend-web/` and the API URL has been updated to point to Rails.

```bash
cd frontend-web

# Update .env if needed
echo "REACT_APP_API_URL=http://localhost:3001/api/v1" > .env

# Start React app
npm start
```

### 4. Set Up React Native (Optional)

```bash
cd frontend-mobile

# Install dependencies
npm install

# For iOS
cd ios && pod install && cd ..
npm run ios

# For Android
npm run android
```

## API Changes

### Endpoint Structure
- **Old**: `http://localhost:3001/api/boats`
- **New**: `http://localhost:3001/api/v1/boats`

### Response Format
The Rails API returns the same JSON structure, so the frontend should work without changes.

### Authentication
- Same JWT token format
- Same header: `Authorization: Bearer <token>`

## Database

The Rails backend uses the same PostgreSQL database. You can:
1. Keep using the existing database (Rails will work with it)
2. Or drop and recreate with Rails migrations

## Testing

### Test Rails API
```bash
# Health check
curl http://localhost:3001/health

# Get boats
curl http://localhost:3001/api/v1/boats
```

### Test React Web
Open: http://localhost:3000

### Test React Native
- iOS: Run in simulator
- Android: Run in emulator or device

## Troubleshooting

### Rails won't start
- Check Ruby version: `ruby -v` (needs 3.2.0+)
- Check database connection in `.env`
- Run `bundle install`

### React can't connect to API
- Check API URL in `.env`
- Ensure Rails server is running on port 3001
- Check CORS settings in Rails

### React Native connection issues
- For physical devices, use your computer's IP instead of localhost
- Check network security config for Android

