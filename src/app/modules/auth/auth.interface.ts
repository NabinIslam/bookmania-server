import { $Enums } from '@prisma/client';

export type ILoginUserResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type IVerifiedLoginUser = {
  userId: string;
  role: 'USER' | 'ADMIN';
};
