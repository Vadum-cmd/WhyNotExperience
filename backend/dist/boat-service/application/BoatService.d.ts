import { IBoatRepository } from '../domain/IBoatRepository';
import { Boat, Experience, BoatFilters } from '../domain/Boat';
export declare class BoatService {
    private boatRepository;
    constructor(boatRepository: IBoatRepository);
    getBoats(filters?: BoatFilters): Promise<Boat[]>;
    getBoatById(id: string, filters?: {
        dateFrom?: string;
        dateTo?: string;
    }): Promise<Boat & {
        experiences: Experience[];
        availableDates: string[];
    }>;
    searchBoats(query: string, filters?: BoatFilters): Promise<Boat[]>;
}
//# sourceMappingURL=BoatService.d.ts.map