# PostgreSQL Setup Guide

This guide will help you set up PostgreSQL for the BOAT application.

## Step 1: Install PostgreSQL

### macOS (using Homebrew)
```bash
brew install postgresql@14
brew services start postgresql@14
```

### macOS (using Postgres.app)
1. Download from: https://postgresapp.com/
2. Install and launch the app
3. Click "Initialize" to create a new server

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Windows
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user during installation

## Step 2: Verify Installation

Check if PostgreSQL is installed and running:
```bash
psql --version
```

You should see something like: `psql (PostgreSQL) 14.x`

## Step 3: Access PostgreSQL

### Option A: Using the default `postgres` user

```bash
# Connect to PostgreSQL
psql -U postgres

# Or if that doesn't work, try:
psql postgres
```

If you're prompted for a password:
- **macOS (Homebrew)**: Usually no password needed, or try your system password
- **macOS (Postgres.app)**: Usually no password needed
- **Linux**: Try your system password or `postgres`
- **Windows**: Use the password you set during installation

### Option B: Find your PostgreSQL user

If you're not sure what user to use:

```bash
# On macOS/Linux, check who you're logged in as
whoami

# Then try connecting with that username
psql -U $(whoami)
# or
psql
```

## Step 4: Set or Change PostgreSQL Password

Once connected to PostgreSQL, you can set or change the password:

```sql
-- Set password for postgres user
ALTER USER postgres WITH PASSWORD 'your_new_password';

-- Or if you're using a different user
ALTER USER your_username WITH PASSWORD 'your_new_password';

-- Exit psql
\q
```

**Important:** Remember this password - you'll need it for the `.env` file!

## Step 5: Create the Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE boat_db;

# Verify it was created
\l

# Exit
\q
```

Or from command line:
```bash
createdb -U postgres boat_db
```

## Step 6: Test Connection

Test that you can connect with your credentials:

```bash
psql -U postgres -d boat_db
```

If it asks for a password, enter the one you set in Step 4.

## Step 7: Gather Your Connection Information

Now you have all the information needed:

- **Host**: `localhost` (or `127.0.0.1`)
- **Port**: `5432` (default PostgreSQL port)
- **Database**: `boat_db`
- **User**: `postgres` (or your username)
- **Password**: The password you set in Step 4

## Common Issues and Solutions

### Issue: "psql: command not found"

**Solution:** PostgreSQL might not be in your PATH. Try:
```bash
# macOS (Homebrew)
export PATH="/usr/local/opt/postgresql@14/bin:$PATH"

# Or find where PostgreSQL is installed
which psql
```

### Issue: "password authentication failed"

**Solutions:**
1. Try connecting without password first: `psql -U postgres`
2. Check if PostgreSQL is using trust authentication (no password needed)
3. Reset the password (see Step 4)

### Issue: "database does not exist"

**Solution:** Create it:
```bash
createdb -U postgres boat_db
```

### Issue: "role does not exist"

**Solution:** Create a user or use existing one:
```sql
CREATE USER postgres WITH PASSWORD 'your_password';
ALTER USER postgres CREATEDB;
```

## Quick Setup Script

Here's a quick way to set everything up:

```bash
# 1. Connect to PostgreSQL (adjust user if needed)
psql -U postgres

# 2. Run these SQL commands:
CREATE DATABASE boat_db;
ALTER USER postgres WITH PASSWORD 'boat_password_123';  # Change this!
\q

# 3. Test connection
psql -U postgres -d boat_db -c "SELECT version();"
```

## For the BOAT Application

Once you have your PostgreSQL information, you'll use it in `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=boat_db
DB_USER=postgres
DB_PASSWORD=your_password_here
```

## Need Help?

If you're still having issues:

1. **Check if PostgreSQL is running:**
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. **Check PostgreSQL logs:**
   ```bash
   # macOS (Homebrew)
   tail -f /usr/local/var/log/postgresql@14.log
   
   # Linux
   sudo tail -f /var/log/postgresql/postgresql-*.log
   ```

3. **Try connecting with different methods:**
   ```bash
   # Method 1: Direct connection
   psql -U postgres
   
   # Method 2: Specify host
   psql -h localhost -U postgres
   
   # Method 3: Use your system username
   psql -U $(whoami)
   ```


