import express from 'express';
import { genreRoutes } from '../modules/genre/genre.route';
import { authorRoutes } from '../modules/author/author.route';
import { bookRoutes } from '../modules/book/book.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
