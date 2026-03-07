"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boatRouter = void 0;
const express_1 = require("express");
const BoatService_1 = require("./application/BoatService");
const BoatRepository_1 = require("./infrastructure/BoatRepository");
const router = (0, express_1.Router)();
exports.boatRouter = router;
const boatService = new BoatService_1.BoatService(new BoatRepository_1.BoatRepository());
router.get('/', async (req, res) => {
    try {
        const filters = req.query;
        const boats = await boatService.getBoats(filters);
        res.json(boats);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const filters = req.query;
        delete filters.q;
        const boats = await boatService.searchBoats(query, filters);
        res.json(boats);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const filters = req.query;
        const boat = await boatService.getBoatById(req.params.id, filters);
        res.json(boat);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
//# sourceMappingURL=routes.js.map