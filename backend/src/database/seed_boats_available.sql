-- Add 10 boats available from Dec 8, 2025 to Jan 31, 2026
-- Each boat has different experience types

-- First, ensure we have enough hosts
INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', 'host1@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Marco Conti', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440021', 'host2@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Laura Ferrari', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440022', 'host3@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Alessandro Romano', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440023', 'host4@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Elena Russo', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440024', 'host5@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Luca Marino', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440025', 'host6@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Giulia Greco', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440026', 'host7@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Matteo Lombardi', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440027', 'host8@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Chiara Esposito', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440028', 'host9@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Riccardo Ricci', 'host', NOW() - INTERVAL '1 year'),
  ('550e8400-e29b-41d4-a716-446655440029', 'host10@boat.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Valentina Moretti', 'host', NOW() - INTERVAL '1 year')
ON CONFLICT (id) DO NOTHING;

-- Insert 10 boats
INSERT INTO boats (id, host_id, name, model, year, location, capacity, cabins, length, price, rating, review_count, images, created_at, updated_at) VALUES
  -- Boat 1: Sailboat
  ('760e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440020', 'Beneteau Oceanis 41.1 - 2019', 'Beneteau Oceanis 41.1', 2019, 'Trieste', 6, 2, 12.3, 350.00, 4.8, 15,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 2: Motor Yacht
  ('760e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440021', 'Azimut 55 Fly - 2020', 'Azimut 55 Fly', 2020, 'Trieste', 8, 3, 16.8, 950.00, 4.9, 22,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 3: Catamaran
  ('760e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440022', 'Fountaine Pajot Lucia 40 - 2018', 'Fountaine Pajot Lucia 40', 2018, 'Trieste', 10, 4, 11.9, 650.00, 4.7, 18,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 4: Classic Sailboat
  ('760e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440023', 'Jeanneau Sun Odyssey 410 - 2017', 'Jeanneau Sun Odyssey 410', 2017, 'Trieste', 8, 3, 12.4, 420.00, 4.6, 12,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 5: Speedboat
  ('760e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440024', 'Cigarette 42 - 2021', 'Cigarette 42', 2021, 'Trieste', 4, 1, 12.8, 750.00, 4.9, 9,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 6: Luxury Yacht
  ('760e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440025', 'Ferretti 550 - 2019', 'Ferretti 550', 2019, 'Trieste', 12, 4, 16.7, 1200.00, 5.0, 28,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 7: Sailing Yacht
  ('760e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440026', 'Bavaria C45 - 2020', 'Bavaria C45', 2020, 'Trieste', 10, 4, 13.6, 580.00, 4.8, 16,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 8: Motorboat
  ('760e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440027', 'Riva 56 Rivale - 2018', 'Riva 56 Rivale', 2018, 'Trieste', 6, 2, 17.1, 1100.00, 4.9, 20,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 9: Catamaran
  ('760e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440028', 'Leopard 40 - 2019', 'Leopard 40', 2019, 'Trieste', 12, 4, 11.9, 720.00, 4.7, 14,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 10: Sailboat
  ('760e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440029', 'Dufour 470 - 2021', 'Dufour 470', 2021, 'Trieste', 8, 3, 14.2, 680.00, 4.9, 11,
   ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
   NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year')
ON CONFLICT (id) DO NOTHING;

-- Insert experiences for each boat (different types)
INSERT INTO experiences (id, boat_id, type, name, duration, description, price, created_at, updated_at) VALUES
  -- Boat 1 experiences
  ('870e8400-e29b-41d4-a716-446655440000', '760e8400-e29b-41d4-a716-446655440000', 'ride', 'Morning Sail', 2,
   ARRAY['Meet at 9 AM', 'Sailing experience', 'Coffee and breakfast', 'Relaxing cruise'], 
   350.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440001', '760e8400-e29b-41d4-a716-446655440000', 'panorama', 'Afternoon Panorama', 3,
   ARRAY['Meet at 2 PM', 'Panoramic tour', 'Learn sailing basics', 'Enjoy the views'], 
   450.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440002', '760e8400-e29b-41d4-a716-446655440000', 'spritz_swim_panorama', 'Sunset Experience', 4,
   ARRAY['Meet at 5 PM', 'Sunset sailing', 'Spritz and snacks', 'Swimming stop', 'Return at sunset'], 
   600.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 2 experiences
  ('870e8400-e29b-41d4-a716-446655440003', '760e8400-e29b-41d4-a716-446655440001', 'panorama', 'Luxury Panorama Tour', 3,
   ARRAY['Meet at the marina', 'Luxury yacht experience', 'Champagne service', 'Professional guide'], 
   950.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440004', '760e8400-e29b-41d4-a716-446655440001', 'spritz_swim_panorama', 'Full Day Luxury', 8,
   ARRAY['Meet at 10 AM', 'Full day experience', 'Lunch on board', 'Multiple stops', 'Swimming', 'Sunset return'], 
   1800.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 3 experiences
  ('870e8400-e29b-41d4-a716-446655440005', '760e8400-e29b-41d4-a716-446655440002', 'ride', 'Catamaran Cruise', 3,
   ARRAY['Meet at the marina', 'Catamaran sailing', 'Stable and comfortable', 'Enjoy the sea'], 
   650.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440006', '760e8400-e29b-41d4-a716-446655440002', 'spritz_swim_panorama', 'Catamaran Adventure', 6,
   ARRAY['Meet at 11 AM', 'Full catamaran experience', 'Multiple swimming stops', 'Lunch included', 'Spritz and drinks'], 
   1100.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 4 experiences
  ('870e8400-e29b-41d4-a716-446655440007', '760e8400-e29b-41d4-a716-446655440003', 'panorama', 'Classic Sail Tour', 4,
   ARRAY['Meet at the marina', 'Classic sailing experience', 'Learn about sailing', 'Panoramic views'], 
   420.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440008', '760e8400-e29b-41d4-a716-446655440003', 'ride', 'Half Day Sail', 4,
   ARRAY['Meet at 10 AM', 'Half day sailing', 'Lunch on board', 'Relaxing experience'], 
   500.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 5 experiences
  ('870e8400-e29b-41d4-a716-446655440009', '760e8400-e29b-41d4-a716-446655440004', 'ride', 'Speedboat Thrill', 2,
   ARRAY['Meet at the marina', 'High-speed experience', 'Feel the power', 'Adrenaline rush'], 
   750.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440010', '760e8400-e29b-41d4-a716-446655440004', 'panorama', 'Speed Panorama', 3,
   ARRAY['Meet at the marina', 'Fast panoramic tour', 'Cover more ground', 'Exciting ride'], 
   900.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 6 experiences
  ('870e8400-e29b-41d4-a716-446655440011', '760e8400-e29b-41d4-a716-446655440005', 'panorama', 'Luxury Yacht Tour', 4,
   ARRAY['Meet at the marina', 'Premium yacht experience', 'Full service', 'Luxury amenities'], 
   1200.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440012', '760e8400-e29b-41d4-a716-446655440005', 'spritz_swim_panorama', 'Ultimate Luxury Day', 10,
   ARRAY['Meet at 9 AM', 'Full day luxury experience', 'Gourmet meals', 'Multiple activities', 'Premium service'], 
   2800.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 7 experiences
  ('870e8400-e29b-41d4-a716-446655440013', '760e8400-e29b-41d4-a716-446655440006', 'ride', 'Sailing Adventure', 3,
   ARRAY['Meet at the marina', 'Sailing experience', 'Learn to sail', 'Enjoy the wind'], 
   580.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440014', '760e8400-e29b-41d4-a716-446655440006', 'spritz_swim_panorama', 'Full Day Sail', 8,
   ARRAY['Meet at 9 AM', 'Full day sailing', 'Lunch included', 'Swimming stops', 'Complete experience'], 
   1400.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 8 experiences
  ('870e8400-e29b-41d4-a716-446655440015', '760e8400-e29b-41d4-a716-446655440007', 'panorama', 'Riva Experience', 4,
   ARRAY['Meet at the marina', 'Classic Riva experience', 'Elegant cruising', 'Premium service'], 
   1100.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440016', '760e8400-e29b-41d4-a716-446655440007', 'spritz_swim_panorama', 'Riva Luxury Day', 6,
   ARRAY['Meet at 11 AM', 'Luxury experience', 'Champagne service', 'Swimming', 'Gourmet lunch'], 
   1800.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 9 experiences
  ('870e8400-e29b-41d4-a716-446655440017', '760e8400-e29b-41d4-a716-446655440008', 'ride', 'Catamaran Fun', 3,
   ARRAY['Meet at the marina', 'Fun catamaran ride', 'Stable platform', 'Great for groups'], 
   720.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440018', '760e8400-e29b-41d4-a716-446655440008', 'spritz_swim_panorama', 'Catamaran Party', 5,
   ARRAY['Meet at 12 PM', 'Party atmosphere', 'Music and drinks', 'Swimming', 'Fun experience'], 
   1200.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  -- Boat 10 experiences
  ('870e8400-e29b-41d4-a716-446655440019', '760e8400-e29b-41d4-a716-446655440009', 'panorama', 'Modern Sail Tour', 3,
   ARRAY['Meet at the marina', 'Modern sailing yacht', 'Comfortable experience', 'Panoramic views'], 
   680.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year'),
  
  ('870e8400-e29b-41d4-a716-446655440020', '760e8400-e29b-41d4-a716-446655440009', 'spritz_swim_panorama', 'Complete Sail Day', 7,
   ARRAY['Meet at 10 AM', 'Full day experience', 'Lunch included', 'Swimming', 'Sailing lessons', 'Sunset return'], 
   1500.00, NOW() - INTERVAL '1 year', NOW() - INTERVAL '1 year')
ON CONFLICT (id) DO NOTHING;


