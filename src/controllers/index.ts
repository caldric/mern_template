// Import
import { Router } from 'express';

// Config
const router: Router = Router();

// Routes
router.get('/', async (req, res) => {
  res.send('hi');
});

// Export
export default router;
