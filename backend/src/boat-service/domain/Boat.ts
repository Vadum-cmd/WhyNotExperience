export interface Boat {
  id: string;
  hostId: string;
  name: string;
  model: string;
  year: number;
  location: string;
  capacity: number;
  cabins: number;
  length: number;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  host?: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  boatId: string;
  type: 'ride' | 'panorama' | 'spritz_swim_panorama';
  name: string;
  duration: number; // in hours
  description: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoatFilters {
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  capacity?: number;
  experienceType?: string;
}

