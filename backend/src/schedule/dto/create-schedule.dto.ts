import { Schedule } from '../entities/schedule.entity';

export class CreateScheduleDto extends Schedule {
  declare description: string;
  declare startDate: Date;
  declare endDate: Date;
  declare userId?: number;
}
