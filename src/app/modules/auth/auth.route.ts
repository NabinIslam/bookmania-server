import express from 'express';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/',
  FileUploadHelper.upload.single('photo'),
  authControllers.register,
);

export const authRoutes = router;
