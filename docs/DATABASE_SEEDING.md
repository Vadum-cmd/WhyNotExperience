# Database Seeding Guide

This guide will help you populate the database with boat data so you can view boat details in the application.

## Quick Seed (Recommended Method)

**Open a new terminal** (keep your backend server running in another terminal):

```bash
cd backend-rails
bundle exec rails console
```

In the Rails console, type:

```ruby
load 'db/seeds.rb'
```

You should see:
```
✅ Seeded 12 users, 11 boats, X experiences
```

Type `exit` to leave the console.

## What Gets Created

### Hosts (10 total)
- **Marco Rossi** (marco@boat.com) - Host of "Azzurra"
- Francesco Rossi
- Maria Bianchi
- Giovanni Verdi
- And 6 more hosts

### Boats (11 total)
1. **Azzurra** - Luxury Yacht (2020) - Hosted by Marco Rossi
   - Capacity: 8 people
   - Cabins: 2
   - Length: 12.5 meters
   - Price: €45/hour
   - Rating: 4.9 (124 reviews)
   - 3 experiences available

2. Dufour 425 Grand Large - 2010
3. Nautitech 44 - 2007
4. Princess V50 - 2006
5. Beneteau Oceanis 41.1 - 2019
6. Azimut 55 Fly - 2020
7. Fountaine Pajot Lucia 40 - 2018
8. Jeanneau Sun Odyssey 410 - 2017
9. Cigarette 42 - 2021
10. Ferretti 550 - 2019
11. Bavaria C45 - 2020

### Experiences
Each boat has 1-3 experiences:
- **Spritz & Sail** (2 hours)
- **Panorama Tour** (3 hours)
- **Spritz, Swim & Panorama** (5 hours)
- And various other experiences

## Verify Seeding Worked

After seeding, test in your browser:

1. Go to http://localhost:3000
2. Click "Search Boats"
3. You should see 11 boats listed
4. Click on "Azzurra" (or any boat)
5. You should see the full boat detail page with:
   - Images
   - Boat details (capacity, cabins, year, length)
   - Host information (Marco Rossi)
   - Experiences
   - Route preview
   - Availability

## Troubleshooting

### "Boat not found" error

**Possible causes:**
1. Database not seeded - Run the seed command above
2. Backend not running - Make sure backend is running on port 3001
3. Wrong boat ID - Check browser console for the actual ID being requested

**To check if boats exist:**
```bash
cd backend-rails
bundle exec rails console
```

Then:
```ruby
Boat.count  # Should return 11
Boat.pluck(:name)  # Should list all boat names
Boat.first.id  # Get the first boat's ID
```

### Seed command doesn't work

If `bundle exec rails db:seed` shows "Usage: rails new...", try:

```bash
cd backend-rails
bundle exec rails console
```

Then in console:
```ruby
load 'db/seeds.rb'
```

### Database connection errors

1. Check PostgreSQL is running:
   ```bash
   pg_isready
   ```

2. Check database exists:
   ```bash
   psql -l | grep boat_db
   ```

3. Check `.env` file in `backend-rails/` has correct database credentials

## After Seeding

Once seeded, you can:
- View all boats in the boat list page
- Click any boat to see its detail page
- See host information (Marco Rossi for Azzurra)
- View available experiences
- See route preview and availability

The "Azzurra" boat matches the design you provided, with Marco Rossi as the host.

