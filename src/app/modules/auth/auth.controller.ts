import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { authServices } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginUserResponse } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';

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

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.login(req.body);

  const { token } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('token', token, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    payload: {
      token,
    },
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await authServices.getMe(user as JwtPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User details retrieved successfully!',
    payload: result,
  });
});

export const authControllers = {
  register,
  login,
  getMe,
};
