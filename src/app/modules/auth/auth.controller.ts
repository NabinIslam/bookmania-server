import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { authServices } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginUserResponse } from './auth.interface';

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
  // set refresh token into cookie
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
      token: result.token,
    },
  });
});

export const authControllers = {
  register,
  login,
};
