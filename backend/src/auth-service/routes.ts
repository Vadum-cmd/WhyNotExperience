import { Router } from 'express';
import { AuthService } from './application/AuthService';
import { UserRepository } from './infrastructure/UserRepository';
import { authenticate, AuthRequest } from '../shared/middleware/auth';

const router = Router();
const authService = new AuthService(new UserRepository());

router.post('/register', async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await authService.getCurrentUser(req.user!.id);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export { router as authRouter };


