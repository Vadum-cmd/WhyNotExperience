# Clear existing data (skip if tables don't exist)
begin
  User.destroy_all
  Boat.destroy_all
  Experience.destroy_all
  Booking.destroy_all
  Review.destroy_all
rescue => e
  puts "Note: Could not clear existing data: #{e.message}"
end

# Create hosts
hosts = [
  User.create!(
    email: 'marco@boat.com',
    password: 'password123',
    name: 'Marco Rossi',
    role: :host
  ),
  User.create!(
    email: 'francesco@boat.com',
    password: 'password123',
    name: 'Francesco Rossi',
    role: :host
  ),
  User.create!(
    email: 'maria@boat.com',
    password: 'password123',
    name: 'Maria Bianchi',
    role: :host
  ),
  User.create!(
    email: 'giovanni@boat.com',
    password: 'password123',
    name: 'Giovanni Verdi',
    role: :host
  ),
  User.create!(
    email: 'sophia@boat.com',
    password: 'password123',
    name: 'Sophia Petryshyn',
    role: :host
  ),
  User.create!(
    email: 'laura@boat.com',
    password: 'password123',
    name: 'Laura Ferrari',
    role: :host
  ),
  User.create!(
    email: 'alessandro@boat.com',
    password: 'password123',
    name: 'Alessandro Romano',
    role: :host
  ),
  User.create!(
    email: 'elena@boat.com',
    password: 'password123',
    name: 'Elena Russo',
    role: :host
  ),
  User.create!(
    email: 'luca@boat.com',
    password: 'password123',
    name: 'Luca Marino',
    role: :host
  ),
  User.create!(
    email: 'giulia@boat.com',
    password: 'password123',
    name: 'Giulia Greco',
    role: :host
  )
]

# Create guests
guests = [
  User.create!(
    email: 'guest@example.com',
    password: 'password123',
    name: 'John Doe',
    role: :guest
  ),
  User.create!(
    email: 'emma@example.com',
    password: 'password123',
    name: 'Emma Wilson',
    role: :guest
  )
]

# Create boats with experiences
boat_data = [
  {
    name: 'Azzurra',
    model: 'Luxury Yacht',
    year: 2020,
    location: 'Trieste',
    capacity: 8,
    cabins: 2,
    length: 12.5,
    price: 45.00,
    rating: 4.9,
    review_count: 124,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 0, # Marco Rossi
    experiences: [
      {
        type: :spritz_swim_panorama,
        name: 'Spritz & Sail',
        duration: 2,
        description: ['Meet up at Marina San Giusto', 'Start the boat ride around Trieste', 'Enjoy your Spritz', 'Take photos and enjoy the sea'],
        price: 45.00
      },
      {
        type: :panorama,
        name: 'Panorama Tour',
        duration: 3,
        description: ['Meet up at Marina San Giusto', 'Start the panoramic boat tour of Trieste', 'Learn history of the city', 'Take photos and enjoy the sea'],
        price: 65.00
      },
      {
        type: :spritz_swim_panorama,
        name: 'Spritz, Swim & Panorama',
        duration: 5,
        description: ['Meet up at Marina San Giusto', 'Start the panoramic boat tour', 'Enjoy your Spritz', 'Learn history of the city', 'Take a swim and enjoy the sea'],
        price: 80.00
      }
    ]
  },
  {
    name: 'Dufour 425 Grand Large - 2010',
    model: 'Dufour 425 Grand Large',
    year: 2010,
    location: 'Trieste',
    capacity: 4,
    cabins: 1,
    length: 10.0,
    price: 260.00,
    rating: 4.9,
    review_count: 19,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 1,
    experiences: [
      {
        type: :spritz_swim_panorama,
        name: 'Spritz & Sail',
        duration: 1,
        description: ['Meet up', 'Start the boat ride around Trieste', 'Enjoy your Spritz', 'Take photos and enjoy the sea'],
        price: 260.00
      },
      {
        type: :panorama,
        name: 'Panorama Tour',
        duration: 2,
        description: ['Meet up', 'Start the panoramic boat tour of Trieste', 'Learn history of the city', 'Take photos and enjoy the sea'],
        price: 300.00
      },
      {
        type: :spritz_swim_panorama,
        name: 'Spritz, Swim & Panorama',
        duration: 5,
        description: ['Meet up', 'Start the panoramic boat tour', 'Enjoy your Spritz', 'Learn history of the city', 'Take a swim and enjoy the sea'],
        price: 500.00
      }
    ]
  },
  {
    name: 'Nautitech 44 - 2007',
    model: 'Nautitech 44',
    year: 2007,
    location: 'Trieste',
    capacity: 12,
    cabins: 5,
    length: 13.47,
    price: 700.00,
    rating: 5.0,
    review_count: 7,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 2,
    experiences: [
      {
        type: :ride,
        name: 'Just a Ride',
        duration: 2,
        description: ['Meet up', 'Start the boat ride', 'Enjoy the sea'],
        price: 700.00
      },
      {
        type: :panorama,
        name: 'Full Day Panorama',
        duration: 8,
        description: ['Meet up', 'Full day tour', 'Lunch on board', 'Swimming stops', 'Sunset return'],
        price: 1200.00
      }
    ]
  },
  {
    name: 'Princess V50 - 2006',
    model: 'Princess V50',
    year: 2006,
    location: 'Trieste',
    capacity: 2,
    cabins: 1,
    length: 15.8,
    price: 643.00,
    rating: 4.9,
    review_count: 3,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 3,
    experiences: [
      {
        type: :panorama,
        name: 'Panorama Tour',
        duration: 3,
        description: ['Meet up', 'Start the panoramic tour', 'Enjoy the views'],
        price: 643.00
      }
    ]
  },
  {
    name: 'Beneteau Oceanis 41.1 - 2019',
    model: 'Beneteau Oceanis 41.1',
    year: 2019,
    location: 'Trieste',
    capacity: 6,
    cabins: 2,
    length: 12.3,
    price: 350.00,
    rating: 4.8,
    review_count: 15,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 4,
    experiences: [
      {
        type: :ride,
        name: 'Morning Sail',
        duration: 2,
        description: ['Meet at 9 AM', 'Sailing experience', 'Coffee and breakfast', 'Relaxing cruise'],
        price: 350.00
      },
      {
        type: :panorama,
        name: 'Afternoon Panorama',
        duration: 3,
        description: ['Meet at 2 PM', 'Panoramic tour', 'Learn sailing basics', 'Enjoy the views'],
        price: 450.00
      },
      {
        type: :spritz_swim_panorama,
        name: 'Sunset Experience',
        duration: 4,
        description: ['Meet at 5 PM', 'Sunset sailing', 'Spritz and snacks', 'Swimming stop', 'Return at sunset'],
        price: 600.00
      }
    ]
  },
  {
    name: 'Azimut 55 Fly - 2020',
    model: 'Azimut 55 Fly',
    year: 2020,
    location: 'Trieste',
    capacity: 8,
    cabins: 3,
    length: 16.8,
    price: 950.00,
    rating: 4.9,
    review_count: 22,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 5,
    experiences: [
      {
        type: :panorama,
        name: 'Luxury Panorama Tour',
        duration: 3,
        description: ['Meet at the marina', 'Luxury yacht experience', 'Champagne service', 'Professional guide'],
        price: 950.00
      },
      {
        type: :spritz_swim_panorama,
        name: 'Full Day Luxury',
        duration: 8,
        description: ['Meet at 10 AM', 'Full day experience', 'Lunch on board', 'Multiple stops', 'Swimming', 'Sunset return'],
        price: 1800.00
      }
    ]
  },
  {
    name: 'Fountaine Pajot Lucia 40 - 2018',
    model: 'Fountaine Pajot Lucia 40',
    year: 2018,
    location: 'Trieste',
    capacity: 10,
    cabins: 4,
    length: 11.9,
    price: 650.00,
    rating: 4.7,
    review_count: 18,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 6,
    experiences: [
      {
        type: :ride,
        name: 'Catamaran Cruise',
        duration: 3,
        description: ['Meet at the marina', 'Catamaran sailing', 'Stable and comfortable', 'Enjoy the sea'],
        price: 650.00
      },
      {
        type: :spritz_swim_panorama,
        name: 'Catamaran Adventure',
        duration: 6,
        description: ['Meet at 11 AM', 'Full catamaran experience', 'Multiple swimming stops', 'Lunch included', 'Spritz and drinks'],
        price: 1100.00
      }
    ]
  },
  {
    name: 'Jeanneau Sun Odyssey 410 - 2017',
    model: 'Jeanneau Sun Odyssey 410',
    year: 2017,
    location: 'Trieste',
    capacity: 8,
    cabins: 3,
    length: 12.4,
    price: 420.00,
    rating: 4.6,
    review_count: 12,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 7,
    experiences: [
      {
        type: :panorama,
        name: 'Classic Sail Tour',
        duration: 4,
        description: ['Meet at the marina', 'Classic sailing experience', 'Learn about sailing', 'Panoramic views'],
        price: 420.00
      },
      {
        type: :ride,
        name: 'Half Day Sail',
        duration: 4,
        description: ['Meet at 10 AM', 'Half day sailing', 'Lunch on board', 'Relaxing experience'],
        price: 500.00
      }
    ]
  },
  {
    name: 'Cigarette 42 - 2021',
    model: 'Cigarette 42',
    year: 2021,
    location: 'Trieste',
    capacity: 4,
    cabins: 1,
    length: 12.8,
    price: 750.00,
    rating: 4.9,
    review_count: 9,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 8,
    experiences: [
      {
        type: :ride,
        name: 'Speedboat Thrill',
        duration: 2,
        description: ['Meet at the marina', 'High-speed experience', 'Feel the power', 'Adrenaline rush'],
        price: 750.00
      },
      {
        type: :panorama,
        name: 'Speed Panorama',
        duration: 3,
        description: ['Meet at the marina', 'Fast panoramic tour', 'Cover more ground', 'Exciting ride'],
        price: 900.00
      }
    ]
  },
  {
    name: 'Ferretti 550 - 2019',
    model: 'Ferretti 550',
    year: 2019,
    location: 'Trieste',
    capacity: 12,
    cabins: 4,
    length: 16.7,
    price: 1200.00,
    rating: 5.0,
    review_count: 28,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 9,
    experiences: [
      {
        type: :panorama,
        name: 'Luxury Yacht Tour',
        duration: 4,
        description: ['Meet at the marina', 'Premium yacht experience', 'Full service', 'Luxury amenities'],
        price: 1200.00
      },
      {
        type: :spritz_swim_panorama,
        name: 'Ultimate Luxury Day',
        duration: 10,
        description: ['Meet at 9 AM', 'Full day luxury experience', 'Gourmet meals', 'Multiple activities', 'Premium service'],
        price: 2800.00
      }
    ]
  },
  {
    name: 'Bavaria C45 - 2020',
    model: 'Bavaria C45',
    year: 2020,
    location: 'Trieste',
    capacity: 10,
    cabins: 4,
    length: 13.6,
    price: 580.00,
    rating: 4.8,
    review_count: 16,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    host_index: 0,
    experiences: [
      {
        type: :ride,
        name: 'Sailing Adventure',
        duration: 3,
        description: ['Meet at the marina', 'Sailing experience', 'Learn to sail', 'Enjoy the wind'],
        price: 580.00
      },
      {
        type: :spritz_swim_panorama,
        name: 'Full Day Sail',
        duration: 8,
        description: ['Meet at 9 AM', 'Full day sailing', 'Lunch included', 'Swimming stops', 'Complete experience'],
        price: 1400.00
      }
    ]
  }
]

boat_data.each do |data|
  host = hosts[data[:host_index] || 0]
  boat = Boat.create!(
    host: host,
    name: data[:name],
    model: data[:model],
    year: data[:year],
    location: data[:location],
    capacity: data[:capacity],
    cabins: data[:cabins],
    length: data[:length],
    price: data[:price],
    rating: data[:rating],
    review_count: data[:review_count],
    images: data[:images]
  )

  data[:experiences].each do |exp_data|
    Experience.create!(
      boat: boat,
      type: exp_data[:type],
      name: exp_data[:name],
      duration: exp_data[:duration],
      description: exp_data[:description],
      price: exp_data[:price]
    )
  end
end

puts "✅ Seeded #{User.count} users, #{Boat.count} boats, #{Experience.count} experiences"
