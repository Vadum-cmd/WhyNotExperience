-- Comprehensive Seed Data for BOAT Application
-- This includes users, boats, experiences, bookings, and reviews

-- Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE reviews, bookings, experiences, boats, users CASCADE;

-- ============================================
-- USERS (Hosts and Guests)
-- ============================================

-- Hosts (password: password123)
INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'francesco@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Francesco Rossi', 'host', NOW() - INTERVAL '2 years'),
  ('550e8400-e29b-41d4-a716-446655440001', 'maria@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Maria Bianchi', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440002', 'giovanni@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Giovanni Verdi', 'host', NOW() - INTERVAL '6 months'),
  ('550e8400-e29b-41d4-a716-446655440003', 'sophia@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Sophia Petryshyn', 'host', NOW() - INTERVAL '3 months')
ON CONFLICT (id) DO NOTHING;

-- Guests (password: password123)
INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', 'guest@example.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'John Doe', 'guest', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440011', 'emma@example.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Emma Wilson', 'guest', NOW() - INTERVAL '8 months'),
  ('550e8400-e29b-41d4-a716-446655440012', 'michael@example.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Michael Brown', 'guest', NOW() - INTERVAL '6 months'),
  ('550e8400-e29b-41d4-a716-446655440013', 'sarah@example.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Sarah Johnson', 'guest', NOW() - INTERVAL '4 months'),
  ('550e8400-e29b-41d4-a716-446655440014', 'david@example.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'David Lee', 'guest', NOW() - INTERVAL '2 months')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- BOATS
-- ============================================

INSERT INTO boats (id, host_id, name, model, year, location, capacity, cabins, length, price, rating, review_count, images, created_at, updated_at) VALUES
  -- Francesco's Boats
  ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Dufour 425 Grand Large - 2010', 'Dufour 425 Grand Large', 2010, 'Trieste', 4, 1, 10.0, 4.9, 19, 
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'], 
   NOW() - INTERVAL '2 years', NOW() - INTERVAL '2 years'),
  
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Nautitech 44 - 2007', 'Nautitech 44', 2007, 'Trieste', 12, 5, 13.47, 5.0, 7,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Maria's Boats
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Princess V50 - 2006', 'Princess V50', 2006, 'Trieste', 2, 1, 15.8, 4.9, 3,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Bavaria 46 - 2015', 'Bavaria 46', 2015, 'Trieste', 8, 3, 14.0, 4.7, 12,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '8 months', NOW() - INTERVAL '8 months'),
  
  -- Giovanni's Boats
  ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Sunseeker Manhattan 52 - 2018', 'Sunseeker Manhattan 52', 2018, 'Trieste', 6, 2, 16.0, 4.8, 8,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '6 months', NOW() - INTERVAL '6 months'),
  
  ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Lagoon 42 - 2019', 'Lagoon 42', 2019, 'Trieste', 10, 4, 12.8, 4.9, 15,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '5 months', NOW() - INTERVAL '5 months'),
  
  -- Sophia's Boats
  ('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 'Jeanneau Sun Odyssey 349 - 2017', 'Jeanneau Sun Odyssey 349', 2017, 'Trieste', 6, 2, 10.5, 4.6, 6,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '3 months', NOW() - INTERVAL '3 months')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- EXPERIENCES
-- ============================================

INSERT INTO experiences (id, boat_id, type, name, duration, description, price, created_at, updated_at) VALUES
  -- Dufour 425 experiences
  ('770e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'spritz_swim_panorama', 'Spritz & Sail', 1, 
   ARRAY['Meet up at the marina', 'Start the boat ride around Trieste', 'Enjoy your Spritz on board', 'Take photos and enjoy the sea'], 
   260.00, NOW() - INTERVAL '2 years', NOW() - INTERVAL '2 years'),
  
  ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440000', 'panorama', 'Panorama Tour', 2, 
   ARRAY['Meet up at the marina', 'Start the panoramic boat tour of Trieste', 'Learn history of the city from the sea', 'Take photos and enjoy the sea'], 
   300.00, NOW() - INTERVAL '2 years', NOW() - INTERVAL '2 years'),
  
  ('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440000', 'spritz_swim_panorama', 'Spritz, Swim & Panorama', 5, 
   ARRAY['Meet up at the marina', 'Start the panoramic boat tour', 'Enjoy your Spritz', 'Learn history of the city', 'Take a swim and enjoy the sea'], 
   500.00, NOW() - INTERVAL '2 years', NOW() - INTERVAL '2 years'),
  
  -- Nautitech 44 experiences
  ('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'ride', 'Just a Ride', 2, 
   ARRAY['Meet up at the marina', 'Start the boat ride', 'Enjoy the sea and relax'], 
   700.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440001', 'panorama', 'Full Day Panorama', 8, 
   ARRAY['Meet up at the marina', 'Full day tour of Trieste coastline', 'Lunch on board', 'Swimming stops', 'Sunset return'], 
   1200.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Princess V50 experiences
  ('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440002', 'panorama', 'Panorama Tour', 3, 
   ARRAY['Meet up at the marina', 'Start the panoramic tour', 'Enjoy the views', 'Professional photography included'], 
   643.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Bavaria 46 experiences
  ('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440003', 'spritz_swim_panorama', 'Sunset Spritz Cruise', 3, 
   ARRAY['Meet up at 6 PM', 'Sunset cruise around Trieste', 'Enjoy Spritz and snacks', 'Swimming in the bay'], 
   450.00, NOW() - INTERVAL '8 months', NOW() - INTERVAL '8 months'),
  
  ('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440003', 'ride', 'Half Day Adventure', 4, 
   ARRAY['Meet up at the marina', 'Explore hidden coves', 'Swimming and snorkeling', 'Lunch included'], 
   600.00, NOW() - INTERVAL '8 months', NOW() - INTERVAL '8 months'),
  
  -- Sunseeker experiences
  ('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440004', 'panorama', 'Luxury Panorama', 3, 
   ARRAY['Meet up at the marina', 'Luxury yacht experience', 'Champagne service', 'Professional guide'], 
   850.00, NOW() - INTERVAL '6 months', NOW() - INTERVAL '6 months'),
  
  -- Lagoon 42 experiences
  ('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440005', 'spritz_swim_panorama', 'Catamaran Experience', 5, 
   ARRAY['Meet up at the marina', 'Catamaran sailing experience', 'Multiple swimming stops', 'Lunch and drinks included'], 
   900.00, NOW() - INTERVAL '5 months', NOW() - INTERVAL '5 months'),
  
  -- Jeanneau experiences
  ('770e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440006', 'ride', 'Morning Sail', 2, 
   ARRAY['Meet up at 9 AM', 'Morning sailing experience', 'Coffee and pastries', 'Relaxing cruise'], 
   350.00, NOW() - INTERVAL '3 months', NOW() - INTERVAL '3 months')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- BOOKINGS (Past, Present, Future)
-- ============================================

-- Past completed bookings
INSERT INTO bookings (id, user_id, boat_id, experience_id, date, start_time, end_time, duration, guests, total_price, status, guest_documents, created_at, updated_at) VALUES
  -- Completed bookings from last month
  ('880e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440000', 
   CURRENT_DATE - INTERVAL '30 days', '11:00:00', '12:00:00', 1, 2, 520.00, 'completed',
   '[{"name": "John Doe", "documentType": "passport", "documentNumber": "AB123456"}]',
   NOW() - INTERVAL '35 days', NOW() - INTERVAL '35 days'),
  
  ('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440003',
   CURRENT_DATE - INTERVAL '25 days', '14:00:00', '16:00:00', 2, 4, 2800.00, 'completed',
   '[{"name": "John Doe", "documentType": "passport", "documentNumber": "AB123456"}]',
   NOW() - INTERVAL '35 days', NOW() - INTERVAL '35 days'),
  
  ('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440003',
   CURRENT_DATE - INTERVAL '25 days', '14:00:00', '16:00:00', 2, 4, 2800.00, 'completed',
   '[{"name": "Emma Wilson", "documentType": "id", "documentNumber": "CD789012"}]',
   NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
  
  ('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440006',
   CURRENT_DATE - INTERVAL '20 days', '10:00:00', '13:00:00', 3, 2, 900.00, 'completed',
   '[{"name": "Michael Brown", "documentType": "passport", "documentNumber": "EF345678"}]',
   NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days'),
  
  -- Confirmed upcoming bookings (next week)
  ('880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440013', '660e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440001',
   CURRENT_DATE + INTERVAL '3 days', '11:00:00', '13:00:00', 2, 3, 900.00, 'confirmed',
   '[{"name": "Sarah Johnson", "documentType": "passport", "documentNumber": "GH901234"}]',
   NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
  
  ('880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440014', '660e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440009',
   CURRENT_DATE + INTERVAL '5 days', '09:00:00', '14:00:00', 5, 6, 5400.00, 'confirmed',
   '[{"name": "David Lee", "documentType": "id", "documentNumber": "IJ567890"}]',
   NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  
  -- Pending bookings (this week)
  ('880e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440008',
   CURRENT_DATE + INTERVAL '7 days', '15:00:00', '18:00:00', 3, 4, 3400.00, 'pending',
   '[{"name": "John Doe", "documentType": "passport", "documentNumber": "AB123456"}]',
   NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  
  -- More upcoming bookings
  ('880e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440007',
   CURRENT_DATE + INTERVAL '10 days', '10:00:00', '14:00:00', 4, 5, 3000.00, 'confirmed',
   '[{"name": "Emma Wilson", "documentType": "id", "documentNumber": "CD789012"}]',
   NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
  
  ('880e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440010',
   CURRENT_DATE + INTERVAL '12 days', '09:00:00', '11:00:00', 2, 2, 700.00, 'pending',
   '[{"name": "Michael Brown", "documentType": "passport", "documentNumber": "EF345678"}]',
   NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- REVIEWS (Ratings and Comments)
-- ============================================

INSERT INTO reviews (id, booking_id, reviewer_id, reviewee_id, rating, comment, created_at, updated_at) VALUES
  -- Reviews for Francesco (host)
  ('990e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 5,
   'Amazing experience! Francesco was a great host and the boat was in perfect condition. Highly recommend!', NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days'),
  
  ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440010', 5,
   'John was a wonderful guest, very respectful and enjoyed the experience. Would host again!', NOW() - INTERVAL '28 days', NOW() - INTERVAL '28 days'),
  
  -- Reviews for Maria (host)
  ('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440001', 4,
   'Great boat and Maria was very professional. The panorama tour was beautiful!', NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days'),
  
  ('990e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440012', 5,
   'Michael was a perfect guest, very polite and punctual. Great experience!', NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days'),
  
  -- Reviews for Giovanni (host)
  ('990e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440002', 5,
   'Incredible catamaran experience! Giovanni knows all the best spots. The whole day was perfect!', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  
  ('990e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440014', 5,
   'David and his group were fantastic guests. Very organized and had a great time!', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  
  -- More reviews for Francesco
  ('990e8400-e29b-41d4-a716-446655440006', '880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 5,
   'Best boat experience ever! The Nautitech is spacious and comfortable. Francesco is an excellent captain.', NOW() - INTERVAL '23 days', NOW() - INTERVAL '23 days'),
  
  ('990e8400-e29b-41d4-a716-446655440007', '880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440011', 5,
   'Emma was wonderful, very friendly and enjoyed every moment. Highly recommend as a guest!', NOW() - INTERVAL '23 days', NOW() - INTERVAL '23 days')
ON CONFLICT (id) DO NOTHING;

-- Update boat ratings based on reviews
UPDATE boats SET 
  rating = (
    SELECT COALESCE(AVG(r.rating), 0)
    FROM reviews r
    JOIN bookings b ON r.booking_id = b.id
    WHERE b.boat_id = boats.id
  ),
  review_count = (
    SELECT COUNT(*)
    FROM reviews r
    JOIN bookings b ON r.booking_id = b.id
    WHERE b.boat_id = boats.id AND r.reviewer_id != boats.host_id
  )
WHERE id IN (
  SELECT DISTINCT b.boat_id
  FROM bookings b
  JOIN reviews r ON r.booking_id = b.id
);

