# Database Seeding Instructions

To populate the database with boat data, follow these steps:

## Option 1: Using Rails Console (Recommended)

1. **Make sure the backend server is NOT running** (or run this in a separate terminal)

2. **Navigate to backend directory:**
   ```bash
   cd backend-rails
   ```

3. **Open Rails console:**
   ```bash
   bundle exec rails console
   ```

4. **In the console, run:**
   ```ruby
   load 'db/seeds.rb'
   ```

5. **You should see:**
   ```
   ✅ Seeded X users, Y boats, Z experiences
   ```

6. **Exit the console:**
   ```ruby
   exit
   ```

## Option 2: Direct Seed Command

If `bundle exec rails db:seed` doesn't work, try:

```bash
cd backend-rails
bundle exec rails runner "load 'db/seeds.rb'"
```

## Option 3: Manual Database Insert (If Rails commands fail)

If the above methods don't work, you can manually insert data using PostgreSQL:

```bash
psql boat_db
```

Then run SQL commands to insert boats. However, this is more complex and not recommended.

## What Gets Seeded

- **10 Hosts** (including Marco Rossi for "Azzurra" boat)
- **2 Guests**
- **11 Boats** (including "Azzurra" with Marco Rossi as host)
- **Multiple Experiences** for each boat

## Verify Seeding

After seeding, you can verify in Rails console:

```ruby
Boat.count  # Should return 11
Boat.first.name  # Should return "Azzurra"
Boat.first.host.name  # Should return "Marco Rossi"
```

## Troubleshooting

If you get errors:
1. Make sure migrations are run: Check if tables exist
2. Make sure database exists: `psql -l | grep boat_db`
3. Check database connection in `.env` file

