import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { authorServices } from './author.service';

const createAuthor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authorServices.createAuthor(req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Author created successfully!',
      payload: result,
    });
  },
);

const getAllAuthors = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authorServices.getAllAuthors();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Authors retrieved successfully',
      payload: result,
    });
  },
);

export const authorControllers = {
  createAuthor,
  getAllAuthors,
};
