import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Request } from 'express';

const createFavorite = async (favoriteData: {
  userId: string;
  bookId: string;
}) => {
  const alreadyExists = await prisma.favorite.findFirst({
    where: {
      userId: favoriteData.userId,
      bookId: favoriteData.bookId,
    },
  });

  if (alreadyExists)
    throw new ApiError(httpStatus.CONFLICT, 'Book already in favorite');

  const favorite = await prisma.favorite.create({
    data: {
      userId: favoriteData.userId,
      bookId: favoriteData.bookId,
    },
  });

  return favorite;
};

const getAllFavorite = async (query: any) => {
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: query.id,
    },
    include: {
      book: true,
    },
  });

  if (!favorites)
    throw new ApiError(httpStatus.NOT_FOUND, 'Favorite not found');

  return favorites;
};

export const favoriteServices = {
  createFavorite,
  getAllFavorite,
};
