import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { PrismaService } from 'src/database/services/prisma.service';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class ScheduleModule {}
