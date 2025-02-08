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

const getAllBooks = async (filters: {
  genre?: string;
  author?: string;
  search?: string;
}) => {
  const { genre, author, search } = filters;

  const books = await prisma.book.findMany({
    where: {
      AND: [
        // Filter by genre (if provided)
        genre
          ? {
              genre: {
                name: {
                  contains: genre,
                  mode: 'insensitive',
                },
              },
            }
          : {},
        // Filter by author (if provided)
        author
          ? { author: { name: { contains: author, mode: 'insensitive' } } }
          : {},
        // Search by book title or description (if provided)
        search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    },
    include: {
      author: true, // Include author details
      genre: true, // Include genre details
    },
  });

  return books;
};

export const bookServices = {
  createBook,
  getAllBooks,
};
