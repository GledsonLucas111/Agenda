import { Event } from '../entities/event.entity';

export class CreateEventDto extends Event {
  declare description: string;
  declare startDate: Date;
  declare endDate: Date;
  declare authorId?: number;
}
