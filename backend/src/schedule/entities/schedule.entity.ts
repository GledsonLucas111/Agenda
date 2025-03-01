import { Prisma } from '@prisma/client';

export class Schedule implements Prisma.ScheduleUncheckedCreateInput {
  id?: number;
  description: string;
  startDate: Date;
  endDate: Date;
  userId?: number;
}
