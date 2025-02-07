import express from 'express';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  FileUploadHelper.upload.single('photo'),
  authControllers.register,
);

router.post('/login', authControllers.login);

export const authRoutes = router;
