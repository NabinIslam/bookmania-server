import slugify from 'slugify';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Request } from 'express';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';

const createAuthor = async (req: Request) => {
  const alreadyExists = await prisma.author.findFirst({
    where: {
      name: req.body.name,
    },
  });

  if (alreadyExists)
    throw new ApiError(httpStatus.CONFLICT, 'Author already exists');

  if (!req.file) throw new ApiError(400, 'No file uploaded!');

  // Upload to Cloudinary
  const uploadResult = await FileUploadHelper.uploadToCloudinary(req.file);

  const author = await prisma.author.create({
    data: {
      name: req.body.name,
      photo: uploadResult?.secure_url,
    },
  });

  return author;
};

const getAllAuthors = async () => {
  const genres = await prisma.author.findMany();

  return genres;
};

export const authorServices = {
  createAuthor,
  getAllAuthors,
};
