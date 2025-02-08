import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { favoriteServices } from './favorite.service';

const createFavorite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await favoriteServices.createFavorite(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book added to Favorite!',
      payload: result,
    });
  },
);

const getAllFavorite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await favoriteServices.getAllFavorite(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'retrieved all Favorites successfully!',
      payload: result,
    });
  },
);

export const favoriteControllers = {
  createFavorite,
  getAllFavorite,
};
