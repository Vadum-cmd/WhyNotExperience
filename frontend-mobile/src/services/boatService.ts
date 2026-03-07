import api from './api';

export interface Boat {
  id: string;
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
  images?: string[];
  host?: {
    id: string;
    name: string;
    avatar?: string;
  };
  availableDates?: string[];
  experiences?: Experience[];
}

export interface Experience {
  id: string;
  type: 'ride' | 'panorama' | 'spritz_swim_panorama';
  name: string;
  duration: number;
  description: string[];
  price: number;
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

export const boatService = {
  async getBoats(filters?: BoatFilters): Promise<Boat[]> {
    const response = await api.get('/boats', { params: filters });
    return response.data;
  },

  async getBoatById(id: string): Promise<Boat> {
    const response = await api.get(`/boats/${id}`);
    return response.data;
  },

  async searchBoats(query: string, filters?: BoatFilters): Promise<Boat[]> {
    const response = await api.get('/boats/search', {
      params: { q: query, ...filters },
    });
    return response.data;
  },
};

