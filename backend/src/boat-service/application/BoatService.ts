import { IBoatRepository } from '../domain/IBoatRepository';
import { Boat, Experience, BoatFilters } from '../domain/Boat';

export class BoatService {
  constructor(private boatRepository: IBoatRepository) {}

  async getBoats(filters?: BoatFilters): Promise<Boat[]> {
    return this.boatRepository.findAll(filters);
  }

  async getBoatById(id: string, filters?: { dateFrom?: string; dateTo?: string }): Promise<Boat & { experiences: Experience[]; availableDates: string[] }> {
    const boat = await this.boatRepository.findById(id);
    if (!boat) {
      throw new Error('Boat not found');
    }

    const experiences = await this.boatRepository.getExperiencesByBoatId(id);
    const availableDates = await this.boatRepository.getAvailableDates(
      id,
      filters?.dateFrom,
      filters?.dateTo
    );

    return {
      ...boat,
      experiences,
      availableDates,
    };
  }

  async searchBoats(query: string, filters?: BoatFilters): Promise<Boat[]> {
    return this.boatRepository.search(query, filters);
  }
}

