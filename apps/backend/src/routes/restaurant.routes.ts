import { Router } from 'express';
import { createRestaurant, getRestaurants } from '../controllers/restaurant.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getRestaurants);
router.post('/', authenticate, createRestaurant);

export default router;
