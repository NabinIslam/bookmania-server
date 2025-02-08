import slugify from 'slugify';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Request } from 'express';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';

const createBook = async (req: Request) => {
  const alreadyExists = await prisma.book.findFirst({
    where: {
      title: req.body.title,
    },
  });

  if (alreadyExists)
    throw new ApiError(httpStatus.CONFLICT, 'Book already exists');

  if (!req.file) throw new ApiError(400, 'No file uploaded!');

  // Upload to Cloudinary
  const uploadResult = await FileUploadHelper.uploadToCloudinary(req.file);

  const book = await prisma.book.create({
    data: {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      coverImage: uploadResult?.secure_url,
    },
  });

  return book;
};

const getAllBooks = async (query: { genre: string; search: string }) => {
  const { genre, search } = query;

  const books = await prisma.book.findMany();

  if (!books) throw new ApiError(httpStatus.NOT_FOUND, 'Could not find books!');

  return books;
};

export const bookServices = {
  createBook,
  getAllBooks,
};
