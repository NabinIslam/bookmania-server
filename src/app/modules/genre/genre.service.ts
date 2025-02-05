import slugify from 'slugify';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

type TGenreData = {
  name: string;
};

const createGenre = async (genreData: TGenreData) => {
  const alreadyExists = await prisma.genre.findFirst({
    where: {
      name: genreData.name,
    },
  });

  if (alreadyExists)
    throw new ApiError(httpStatus.CONFLICT, 'Genre already exists');

  const genre = await prisma.genre.create({
    data: {
      name: genreData.name,
      slug: slugify(genreData.name, {
        lower: true,
      }),
    },
  });

  return genre;
};

const getAllGenres = async () => {
  const genres = await prisma.genre.findMany();

  return genres;
};

export const genreServices = {
  createGenre,
  getAllGenres,
};
