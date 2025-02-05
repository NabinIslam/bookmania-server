import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdminRoutes } from '../modules/admin/admin.route';
import { genreRoutes } from '../modules/genre/genre.route';
import { authorRoutes } from '../modules/author/author.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
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
