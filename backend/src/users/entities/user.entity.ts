import { Prisma } from '@prisma/client';

export class User implements Prisma.UsersUncheckedCreateInput {
  name: string;
  email: string;
  password: string;
}
