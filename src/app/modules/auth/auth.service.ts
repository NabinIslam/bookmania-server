import { Request } from 'express';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { hashedPassword } from '../../../helpers/hashPasswordHelper';
import { AuthUtils } from './auth.utils';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

type TUserLoginData = {
  email: string;
  password: string;
};

const register = async (req: Request) => {
  const alreadyExists = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (alreadyExists)
    throw new ApiError(httpStatus.CONFLICT, 'User already exists');

  if (!req.file) throw new ApiError(400, 'No file uploaded!');

  // Upload to Cloudinary
  const uploadResult = await FileUploadHelper.uploadToCloudinary(req.file);

  const hashPassword = await hashedPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      ...req.body,
      photo: uploadResult?.secure_url,
      password: hashPassword,
    },
  });

  return user;
};

const login = async (userLoginData: TUserLoginData) => {
  const userExists = await prisma.user.findFirst({
    where: {
      email: userLoginData.email,
    },
  });

  if (!userExists) throw new ApiError(httpStatus.CONFLICT, 'User not found!');

  if (
    userExists.password &&
    !(await AuthUtils.comparePasswords(
      userLoginData.password,
      userExists.password,
    ))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role, email } = userExists;

  const token = jwtHelpers.createToken(
    { userId, email, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    token,
    user: userExists,
  };
};

export const authServices = {
  register,
  login,
};
