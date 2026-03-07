# BOAT - Book Your Ride!

A marketplace application connecting local hosts offering unique boat experiences with guests seeking those experiences.

## Architecture

### Backend
- **Ruby on Rails 8** - API-only backend
- RESTful API design
- JWT authentication
- PostgreSQL database

### Frontend
- **React** - Web application (SPA)
- **React Native** - Mobile applications (iOS & Android)
- Shared API client for both platforms

## Project Structure

```
BOAT/
├── backend-rails/      # Rails 8 API backend
├── frontend-web/       # React web application
├── frontend-mobile/   # React Native mobile app
├── database/          # Database migrations and schemas
└── docs/             # Documentation
```

## How to Start the Project

### Prerequisites

- **Ruby** 3.2.0+ (`ruby -v`)
- **PostgreSQL** 14+ running (`pg_isready`)
- **Node.js** 18+ (`node -v`)

Create the database if it doesn’t exist:

```bash
createdb boat_db
```

### First-time setup

**Backend:**

```bash
cd backend-rails
bundle install
cp .env.example .env
# Edit .env with your PostgreSQL credentials if needed
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed
```

**Frontend:**

```bash
cd frontend-web
npm install
cp .env.example .env
# Set REACT_APP_API_URL=http://localhost:3001/api/v1 if needed
```

### Start the application (two terminals)

**Terminal 1 – Backend:**

```bash
cd backend-rails
bin/rails server -p 3001
```

**Terminal 2 – Frontend:**

```bash
cd frontend-web
npm start
```

- **Backend API:** http://localhost:3001 (health: http://localhost:3001/health)
- **Web app:** http://localhost:3000

### Optional: helper script

From the project root:

```bash
chmod +x START_PROJECT.sh
./START_PROJECT.sh
```

Choose 1 (backend only), 2 (frontend only), or run it twice in two terminals for both.

### Stopping the application

- **Stop backend or frontend:** In the terminal where the server is running, press `Ctrl+C`.
- **Server already running (PID / port in use):**
  - Get PID by port: `lsof -ti:3001` (backend) or `lsof -ti:3000` (frontend).
  - Or read backend PID file: `cat backend-rails/tmp/pids/server.pid`.
  - Stop process: `kill $(lsof -ti:3001)` or `kill -9 <PID>`.
  - Remove stale PID file if needed: `rm -f backend-rails/tmp/pids/server.pid`.

### Troubleshooting

| Issue | What to do |
|-------|------------|
| `Could not locate Gemfile` | Run commands from `backend-rails/`, not the repo root. |
| Seeing "rails new" usage instead of server | Use `bin/rails server -p 3001` (not `bundle exec rails server`). |
| Port 3000 or 3001 in use | See [Stopping the application](#stopping-the-application): `kill $(lsof -ti:3001)` or `kill $(lsof -ti:3000)`. |
| Database connection errors | Check `backend-rails/.env`; ensure PostgreSQL is running (`pg_isready`) and `boat_db` exists (`psql -l \| grep boat_db`). |
| No boats in the app | Seed the DB: `cd backend-rails && bundle exec rake db:seed`. |

More detail: [docs/QUICK_START.md](docs/QUICK_START.md), [START_APPLICATION.md](START_APPLICATION.md).

## Features

### For Guests
- Browse available boats and experiences
- Search and filter boats by date, location, price, rating
- Book boat experiences (2-24 hours)
- Three experience types:
  - Just a ride
  - Panorama tour
  - Spritz, Swim & Panorama
- View booking history
- Leave reviews and ratings

### For Hosts
- Create and manage boat listings
- Set availability schedules
- Manage bookings
- View guest lists
- Receive payments

### System Features
- Governmental email integration for ride confirmation
- Real-time notifications
- Multi-language support (Ukrainian, English)
- Responsive design (web and mobile)

## Getting Started

For a short checklist, see [How to Start the Project](#how-to-start-the-project) above. Below is detailed setup for each part of the stack.

### Prerequisites
- Ruby 3.2.0+ (`ruby -v`)
- Rails 8.0+ (installed via `bundle install`)
- PostgreSQL 14+ (`psql --version`)
- Node.js 18+ (`node -v`)
- React Native development environment (for mobile - optional)

### Backend Setup (Rails)

1. Install dependencies (installs locally in project):
   ```bash
   cd backend-rails
   bundle install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. Set up database:
   ```bash
   bundle exec rake db:create
   bundle exec rake db:migrate
   bundle exec rake db:seed
   ```

4. Start the server:
   ```bash
   bin/rails server -p 3001
   ```

The API will be available at: **http://localhost:3001**

### Frontend Web Setup (React)

1. Install dependencies:
   ```bash
   cd frontend-web
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Set REACT_APP_API_URL=http://localhost:3001/api/v1
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The web app will be available at: **http://localhost:3000**

### Frontend Mobile Setup (React Native)

1. Install dependencies (installs locally in project):
   ```bash
   cd frontend-mobile
   npm install  # ✅ Installs packages locally in node_modules/, nothing global
   ```

2. For iOS:
   ```bash
   cd ios
   pod install  # ✅ Installs CocoaPods dependencies locally in ios/Pods/, nothing global
   cd ..
   npm run ios  # ✅ No installation, just runs the app
   ```

3. For Android:
   ```bash
   npm run android  # ✅ No installation, just runs the app
   ```

**Note:** All `npm install` and `pod install` commands install packages **locally** in the project directory, not globally on your system.

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user

### Boats
- `GET /api/v1/boats` - List boats (with filters)
- `GET /api/v1/boats/:id` - Get boat details
- `GET /api/v1/boats/search?q=query` - Search boats

### Bookings
- `GET /api/v1/bookings` - Get user bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings/:id` - Get booking details
- `DELETE /api/v1/bookings/:id` - Cancel booking

## Tech Stack

### Backend
- Ruby on Rails 8
- PostgreSQL
- JWT Authentication
- Action Mailer (for governmental emails)

### Frontend Web
- React 18
- TypeScript
- React Router
- Axios

### Frontend Mobile
- React Native
- TypeScript
- React Navigation
- Axios

## License

MIT
