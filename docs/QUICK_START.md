# Quick Start Guide

Follow these steps to get the BOAT application running.

## Prerequisites Check

Before starting, make sure you have:
- ✅ Ruby 3.2.0+ installed (`ruby -v`)
- ✅ PostgreSQL running (`psql --version`)
- ✅ Node.js 18+ installed (`node -v`)
- ✅ Database `boat_db` exists (or create it with `createdb boat_db`)

## Step-by-Step Startup

### 1. Start the Rails Backend

Open **Terminal 1**:

```bash
cd backend-rails

# Install dependencies (first time only)
bundle install

# Set up environment (first time only)
cp .env.example .env
# Edit .env with your database credentials if needed

# Set up database (first time only)
bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails db:seed

# Start the server
bundle exec rails server
```

✅ Backend should be running at: **http://localhost:3001**

You can test it by visiting: http://localhost:3001/health

---

### 2. Start the React Web Frontend

Open **Terminal 2**:

```bash
cd frontend-web

# Install dependencies (first time only)
npm install

# Set up environment (first time only)
cp .env.example .env
# The default API URL should be: REACT_APP_API_URL=http://localhost:3001/api/v1

# Start the development server
npm start
```

✅ Web app should open automatically at: **http://localhost:3000**

---

### 3. (Optional) Start React Native Mobile App

Open **Terminal 3**:

#### For iOS:
```bash
cd frontend-mobile

# Install dependencies (first time only)
npm install

# Install iOS dependencies (first time only)
cd ios
pod install
cd ..

# Start Metro bundler
npm start

# In another terminal, run iOS app
npm run ios
```

#### For Android:
```bash
cd frontend-mobile

# Install dependencies (first time only)
npm install

# Start Metro bundler
npm start

# In another terminal, run Android app
npm run android
```

---

## Verification

### Check Backend
```bash
# Health check
curl http://localhost:3001/health

# Get boats list
curl http://localhost:3001/api/v1/boats
```

### Check Frontend
- Open browser: http://localhost:3000
- You should see the BOAT homepage
- Try searching for boats

---

## Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Verify database connection in `.env`
- Check Ruby version: `ruby -v` (needs 3.2.0+)
- Try: `bundle exec rails db:migrate:status`

### Frontend can't connect to backend
- Make sure backend is running on port 3001
- Check `REACT_APP_API_URL` in `frontend-web/.env`
- Check browser console for errors

### Database errors
- Make sure PostgreSQL is running: `pg_isready`
- Check database exists: `psql -l | grep boat_db`
- If database doesn't exist: `createdb boat_db`

### React Native issues
- For iOS: Make sure Xcode is installed
- For Android: Make sure Android Studio and SDK are set up
- Check Metro bundler is running before starting app

---

## Default Credentials

After seeding, you can login with:

**Guest:**
- Email: `guest@example.com`
- Password: `password123`

**Host:**
- Email: `francesco@boat.com`
- Password: `password123`

---

## Stopping the Application

1. **Stop Rails backend**: Press `Ctrl+C` in Terminal 1
2. **Stop React frontend**: Press `Ctrl+C` in Terminal 2
3. **Stop React Native**: Press `Ctrl+C` in Metro bundler terminal

---

## Next Steps

- Explore the boat listings
- Create a booking
- Check out the React Native app (if set up)
- Read the API documentation in `docs/API.md`

