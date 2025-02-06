import express from 'express';
import { genreRoutes } from '../modules/genre/genre.route';
import { authorRoutes } from '../modules/author/author.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/genres',
    route: genreRoutes,
  },
  {
    path: '/authors',
    route: authorRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
