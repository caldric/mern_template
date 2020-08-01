// Import
import { Response, Request, Router } from 'express';
import User from '../models/user';
import { IUser } from '../types/user';

// Config
const router: Router = Router();

// Routes
router.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    const users: IUser[] = await User.find().catch((error) => {
      throw error;
    });
    res.status(200).json(users);
  }
);

router.get(
  '/seed',
  async (req: Request, res: Response): Promise<void> => {
    const newUsers = [
      { name: 'claude0', password: 'password' },
      { name: 'claude1', password: 'password' },
      { name: 'claude2', password: 'password' },
      { name: 'claude3', password: 'password' },
      { name: 'claude4', password: 'password' },
      { name: 'claude5', password: 'password' },
    ];

    await User.deleteMany({});
    await User.create(newUsers).catch((error) => {
      throw error;
    });

    res.redirect('/api');
  }
);

// Export
export default router;
