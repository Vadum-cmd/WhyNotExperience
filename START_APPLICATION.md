# How to Start the Application

## Quick Start (Both Servers)

### Option 1: Start Both Servers Manually

**Terminal 1 - Backend (Rails):**
```bash
cd backend-rails
bundle exec rails server -p 3001
```

**Terminal 2 - Frontend (React):**
```bash
cd frontend-web
npm start
```

### Option 2: Use the Helper Script

```bash
./START_PROJECT.sh
```

## Verify Everything is Running

1. **Backend API**: http://localhost:3001/health
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Frontend Web App**: http://localhost:3000
   - Should show the Boat application homepage

## Troubleshooting

### Backend Won't Start

**Check if port 3001 is already in use:**
```bash
lsof -ti:3001
# If it returns a PID, kill it: kill -9 <PID>
```

**Check database connection:**
```bash
cd backend-rails
psql boat_db -c "SELECT 1;"
```

**Restart backend:**
```bash
cd backend-rails
bundle exec rails server -p 3001
```

### Frontend Won't Start

**Check if port 3000 is already in use:**
```bash
lsof -ti:3000
# If it returns a PID, kill it: kill -9 <PID>
```

**Clear cache and reinstall:**
```bash
cd frontend-web
rm -rf node_modules/.cache
npm install
npm start
```

### Common Errors

**"Cannot find module" errors:**
```bash
cd frontend-web
rm -rf node_modules
npm install
```

**"Database connection" errors:**
```bash
# Make sure PostgreSQL is running
pg_isready

# Check database exists
psql -l | grep boat_db
```

**"Port already in use" errors:**
```bash
# Kill processes on ports
kill -9 $(lsof -ti:3000)
kill -9 $(lsof -ti:3001)
```

## Current Status Check

Both servers should be running:
- ✅ Backend: http://localhost:3001
- ✅ Frontend: http://localhost:3000

If you see errors, check the terminal output for specific error messages.

