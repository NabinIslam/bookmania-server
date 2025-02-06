import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { bookServices } from './book.service';

const createBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookServices.createBook(req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book created successfully!',
      payload: result,
    });
  },
);

const getAllBooks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookServices.getAllBooks();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books retrieved successfully',
      payload: result,
    });
  },
);

export const bookControllers = {
  createBook,
  getAllBooks,
};
