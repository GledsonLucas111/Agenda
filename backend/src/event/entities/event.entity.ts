import { Prisma } from '@prisma/client';

export class Event implements Prisma.EventUncheckedCreateInput {
  description: string;
  startDate: Date;
  endDate: Date;
  authorId?: number;
}
