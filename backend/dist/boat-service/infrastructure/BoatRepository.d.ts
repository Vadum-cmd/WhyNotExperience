import { IBoatRepository } from '../domain/IBoatRepository';
import { Boat, Experience, BoatFilters } from '../domain/Boat';
export declare class BoatRepository implements IBoatRepository {
    findAll(filters?: BoatFilters): Promise<Boat[]>;
    findById(id: string): Promise<Boat | null>;
    search(query: string, filters?: BoatFilters): Promise<Boat[]>;
    getExperiencesByBoatId(boatId: string): Promise<Experience[]>;
    getAvailableDates(boatId: string, dateFrom?: string, dateTo?: string): Promise<string[]>;
}
//# sourceMappingURL=BoatRepository.d.ts.map