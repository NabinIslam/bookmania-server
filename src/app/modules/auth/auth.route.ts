import express from 'express';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { authControllers } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  FileUploadHelper.upload.single('photo'),
  authControllers.register,
);

router.post('/login', authControllers.login);

router.get('/me', auth(), authControllers.getMe);

export const authRoutes = router;
