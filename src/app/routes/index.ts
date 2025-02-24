import express from 'express';
import { genreRoutes } from '../modules/genre/genre.route';
import { authorRoutes } from '../modules/author/author.route';
import { bookRoutes } from '../modules/book/book.route';
import { authRoutes } from '../modules/auth/auth.route';
import { favoriteRoutes } from '../modules/favorite/favorite.route';

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
  {
    path: '/books',
    route: bookRoutes,
  },
  {
    path: '/users',
    route: authRoutes,
  },
  {
    path: '/favorites',
    route: favoriteRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
