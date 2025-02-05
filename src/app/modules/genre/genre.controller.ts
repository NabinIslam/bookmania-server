import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { genreServices } from './genre.service';

const createGenre = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const result = await genreServices.createGenre(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Genre created successfully!',
      payload: result,
    });
  },
);

const getAllGenres = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await genreServices.getAllGenres();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'genres retrieved successfully',
      payload: result,
    });
  },
);

export const genreControllers = {
  createGenre,
  getAllGenres,
};
