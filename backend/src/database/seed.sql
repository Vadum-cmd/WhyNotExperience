-- Seed data for testing

-- Insert sample users
INSERT INTO users (id, email, password_hash, name, role) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'host@example.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'Francesco', 'host'),
  ('550e8400-e29b-41d4-a716-446655440001', 'guest@example.com', '$2b$10$rQZ8XK8XK8XK8XK8XK8XK.8XK8XK8XK8XK8XK8XK8XK8XK8XK8XK', 'John Doe', 'guest')
ON CONFLICT (id) DO NOTHING;

-- Insert sample boats
INSERT INTO boats (id, host_id, name, model, year, location, capacity, cabins, length, price, rating, review_count, images) VALUES
  ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Dufour 425 Grand Large - 2010', 'Dufour 425 Grand Large', 2010, 'Trieste', 4, 1, 10.0, 260.00, 4.9, 19, ARRAY['https://example.com/boat1-1.jpg', 'https://example.com/boat1-2.jpg', 'https://example.com/boat1-3.jpg', 'https://example.com/boat1-4.jpg']),
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Nautitech 44 - 2007', 'Nautitech 44', 2007, 'Trieste', 12, 5, 13.47, 700.00, 5.0, 7, ARRAY['https://example.com/boat2-1.jpg', 'https://example.com/boat2-2.jpg', 'https://example.com/boat2-3.jpg', 'https://example.com/boat2-4.jpg']),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Princess V50 - 2006', 'Princess V50', 2006, 'Trieste', 2, 1, 15.8, 643.00, 4.9, 3, ARRAY['https://example.com/boat3-1.jpg', 'https://example.com/boat3-2.jpg', 'https://example.com/boat3-3.jpg', 'https://example.com/boat3-4.jpg'])
ON CONFLICT (id) DO NOTHING;

-- Insert sample experiences
INSERT INTO experiences (id, boat_id, type, name, duration, description, price) VALUES
  ('770e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'spritz_swim_panorama', 'Spritz & Sail', 1, ARRAY['Meet up', 'Start the boat ride around Trieste', 'Enjoy your Spritz', 'Take photos and enjoy the sea'], 260.00),
  ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440000', 'panorama', 'Panorama Tour', 2, ARRAY['Meet up', 'Start the panoramic boat tour of Trieste', 'Learn history of the city', 'Take photos and enjoy the sea'], 300.00),
  ('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440000', 'spritz_swim_panorama', 'Spritz, Swim & Panorama', 5, ARRAY['Meet up', 'Start the panoramic boat tour of Trieste', 'Enjoy your Spritz', 'Learn history of the city', 'Take a swim and enjoy the sea'], 500.00),
  ('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'ride', 'Just a Ride', 2, ARRAY['Meet up', 'Start the boat ride', 'Enjoy the sea'], 700.00),
  ('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440002', 'panorama', 'Panorama Tour', 3, ARRAY['Meet up', 'Start the panoramic tour', 'Enjoy the views'], 643.00)
ON CONFLICT (id) DO NOTHING;


