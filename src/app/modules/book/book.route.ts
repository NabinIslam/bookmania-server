import express from 'express';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { bookControllers } from './book.controller';

const router = express.Router();

router.post(
  '/',
  FileUploadHelper.upload.single('coverImage'),
  bookControllers.createBook,
);
router.get('/', bookControllers.getAllBooks);

export const bookRoutes = router;
