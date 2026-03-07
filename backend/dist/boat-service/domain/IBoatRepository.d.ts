import { Boat, Experience, BoatFilters } from './Boat';
export interface IBoatRepository {
    findAll(filters?: BoatFilters): Promise<Boat[]>;
    findById(id: string): Promise<Boat | null>;
    search(query: string, filters?: BoatFilters): Promise<Boat[]>;
    getExperiencesByBoatId(boatId: string): Promise<Experience[]>;
    getAvailableDates(boatId: string, dateFrom?: string, dateTo?: string): Promise<string[]>;
}
//# sourceMappingURL=IBoatRepository.d.ts.map