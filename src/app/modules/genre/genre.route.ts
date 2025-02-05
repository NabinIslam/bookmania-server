import express from 'express';
import { genreControllers } from './genre.controller';

const router = express.Router();

router.post('/', genreControllers.createGenre);
router.get('/', genreControllers.getAllGenres);

export const genreRoutes = router;
