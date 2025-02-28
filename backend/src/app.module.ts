import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [UsersModule, ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
