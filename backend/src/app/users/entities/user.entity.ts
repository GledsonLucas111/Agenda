import { Prisma } from '@prisma/client';

export class User implements Prisma.UsersUncheckedCreateInput {
  id?: number;
  name: string;
  email: string;
  password: string;
}
