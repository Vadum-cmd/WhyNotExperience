# BOAT API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "guest" | "host"
}
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "guest"
  },
  "token": "jwt-token"
}
```

#### Login
```
POST /auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "guest"
  },
  "token": "jwt-token"
}
```

#### Get Current User
```
GET /auth/me
```

Headers: `Authorization: Bearer <token>`

Response:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "guest"
}
```

### Boats

#### Get All Boats
```
GET /boats
```

Query parameters:
- `location` (string): Filter by location
- `dateFrom` (date): Filter by start date
- `dateTo` (date): Filter by end date
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `minRating` (number): Minimum rating
- `capacity` (number): Minimum capacity

Response:
```json
[
  {
    "id": "uuid",
    "name": "Dufour 425 Grand Large - 2010",
    "model": "Dufour 425 Grand Large",
    "year": 2010,
    "location": "Trieste",
    "capacity": 4,
    "cabins": 1,
    "length": 10.0,
    "price": 260.00,
    "rating": 4.9,
    "reviewCount": 19,
    "images": ["url1", "url2"],
    "host": {
      "id": "uuid",
      "name": "Francesco"
    }
  }
]
```

#### Search Boats
```
GET /boats/search?q=query
```

Query parameters: Same as Get All Boats, plus:
- `q` (string): Search query

#### Get Boat by ID
```
GET /boats/:id
```

Query parameters:
- `dateFrom` (date): Optional start date for availability
- `dateTo` (date): Optional end date for availability

Response:
```json
{
  "id": "uuid",
  "name": "Dufour 425 Grand Large - 2010",
  "model": "Dufour 425 Grand Large",
  "year": 2010,
  "location": "Trieste",
  "capacity": 4,
  "cabins": 1,
  "length": 10.0,
  "price": 260.00,
  "rating": 4.9,
  "reviewCount": 19,
  "images": ["url1", "url2"],
  "experiences": [
    {
      "id": "uuid",
      "type": "spritz_swim_panorama",
      "name": "Spritz & Sail",
      "duration": 1,
      "description": ["Meet up", "Start the boat ride"],
      "price": 260.00
    }
  ],
  "availableDates": ["2025-08-26", "2025-08-27"]
}
```

### Bookings

#### Create Booking
```
POST /bookings
```

Headers: `Authorization: Bearer <token>`

Request body:
```json
{
  "boatId": "uuid",
  "experienceId": "uuid",
  "date": "2025-08-26",
  "startTime": "11:00",
  "guests": 2,
  "guestDocuments": [
    {
      "name": "John Doe",
      "documentType": "passport",
      "documentNumber": "AB123456"
    }
  ]
}
```

Response:
```json
{
  "id": "uuid",
  "userId": "uuid",
  "boatId": "uuid",
  "experienceId": "uuid",
  "date": "2025-08-26",
  "startTime": "11:00",
  "endTime": "12:00",
  "duration": 1,
  "guests": 2,
  "totalPrice": 520.00,
  "status": "confirmed",
  "guestDocuments": [...],
  "createdAt": "2025-01-01T00:00:00Z"
}
```

**Note:** Upon successful booking, an email is automatically sent to the governmental email address with booking details and guest documents for confirmation.

#### Get User Bookings
```
GET /bookings
```

Headers: `Authorization: Bearer <token>`

Response:
```json
[
  {
    "id": "uuid",
    "boatId": "uuid",
    "boatName": "Dufour 425",
    "experienceId": "uuid",
    "experienceName": "Spritz & Sail",
    "date": "2025-08-26",
    "startTime": "11:00",
    "endTime": "12:00",
    "duration": 1,
    "guests": 2,
    "totalPrice": 520.00,
    "status": "confirmed"
  }
]
```

#### Get Booking by ID
```
GET /bookings/:id
```

Headers: `Authorization: Bearer <token>`

#### Cancel Booking
```
DELETE /bookings/:id
```

Headers: `Authorization: Bearer <token>`

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message"
}
```

Status codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error


