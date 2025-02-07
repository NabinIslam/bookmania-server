import { Request } from 'express';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { hashedPassword } from '../../../helpers/hashPasswordHelper';

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

export const authServices = {
  register,
};
