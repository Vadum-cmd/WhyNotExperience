"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoatService = void 0;
class BoatService {
    constructor(boatRepository) {
        this.boatRepository = boatRepository;
    }
    async getBoats(filters) {
        return this.boatRepository.findAll(filters);
    }
    async getBoatById(id, filters) {
        const boat = await this.boatRepository.findById(id);
        if (!boat) {
            throw new Error('Boat not found');
        }
        const experiences = await this.boatRepository.getExperiencesByBoatId(id);
        const availableDates = await this.boatRepository.getAvailableDates(id, filters?.dateFrom, filters?.dateTo);
        return {
            ...boat,
            experiences,
            availableDates,
        };
    }
    async searchBoats(query, filters) {
        return this.boatRepository.search(query, filters);
    }
}
exports.BoatService = BoatService;
//# sourceMappingURL=BoatService.js.map