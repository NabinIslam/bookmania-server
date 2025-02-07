import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { authServices } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.register(req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User registration successful!',
      payload: result,
    });
  },
);

export const authControllers = {
  register,
};
