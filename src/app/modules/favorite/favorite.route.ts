import express from 'express';
import { favoriteControllers } from './favorite.controller';

const router = express.Router();

router.post(
  '/',

  favoriteControllers.createFavorite,
);

export const favoriteRoutes = router;
