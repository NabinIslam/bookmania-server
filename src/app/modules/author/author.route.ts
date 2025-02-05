import express from 'express';
import { authorControllers } from './author.controller';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';

const router = express.Router();

router.post(
  '/',
  FileUploadHelper.upload.single('photo'),
  authorControllers.createAuthor,
);
router.get('/', authorControllers.getAllAuthors);

export const authorRoutes = router;
