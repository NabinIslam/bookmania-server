import express from 'express';
import { favoriteControllers } from './favorite.controller';

const router = express.Router();

router.post('/', favoriteControllers.createFavorite);
router.get('/', favoriteControllers.getAllFavorite);

export const favoriteRoutes = router;
