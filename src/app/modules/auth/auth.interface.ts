import { $Enums, Role } from '@prisma/client';

export type ILoginUserResponse = {
  token: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type IVerifiedLoginUser = {
  userId: string;
  role: 'USER' | 'ADMIN';
};
