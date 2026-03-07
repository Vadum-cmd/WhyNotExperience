import { Router } from 'express';
import { BoatService } from './application/BoatService';
import { BoatRepository } from './infrastructure/BoatRepository';

const router = Router();
const boatService = new BoatService(new BoatRepository());

router.get('/', async (req, res) => {
  try {
    const filters = req.query as any;
    const boats = await boatService.getBoats(filters);
    res.json(boats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    const filters = req.query as any;
    delete filters.q;
    const boats = await boatService.searchBoats(query, filters);
    res.json(boats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const filters = req.query as { dateFrom?: string; dateTo?: string };
    const boat = await boatService.getBoatById(req.params.id, filters);
    res.json(boat);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export { router as boatRouter };

