import { $Enums, Role } from '@prisma/client';

export type ILoginUserResponse = {
  token: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: 'USER' | 'ADMIN';
};
