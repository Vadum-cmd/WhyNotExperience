# Rails 8 Backend Setup Guide

## Prerequisites

- Ruby 3.2.0+
- Rails 8.0+
- PostgreSQL 14+
- Bundler gem

## Installation

1. **Install Ruby** (if not already installed):
   ```bash
   # Using rbenv
   rbenv install 3.2.0
   rbenv global 3.2.0

   # Or using Homebrew (macOS)
   brew install ruby
   ```

2. **Install Rails** (optional - can use bundle exec instead):
   ```bash
   # Option 1: Install globally (if you want rails command available everywhere)
   gem install rails
   
   # Option 2: Skip this - Rails will be installed locally via bundle install
   ```

3. **Navigate to backend directory**:
   ```bash
   cd backend-rails
   ```

4. **Install dependencies**:
   ```bash
   bundle install
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Set up database**:
   ```bash
   rails db:create
   rails db:migrate
   rails db:seed
   ```

7. **Start the server**:
   ```bash
   rails server
   ```

The API will be available at: **http://localhost:3001**

## API Endpoints

All endpoints are prefixed with `/api/v1`:

- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user
- `GET /api/v1/boats` - List boats
- `GET /api/v1/boats/:id` - Get boat details
- `GET /api/v1/boats/search?q=query` - Search boats
- `GET /api/v1/bookings` - Get user bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings/:id` - Get booking details
- `DELETE /api/v1/bookings/:id` - Cancel booking

## Database

The Rails backend uses the same PostgreSQL database as before. Make sure your `.env` file has the correct database credentials.

## Testing

```bash
# Run tests
bundle exec rspec

# Run console
rails console

# Check routes
rails routes
```

