import { Module } from '@nestjs/common';
import { UsersModule } from './app/users/users.module';
import { ScheduleModule } from './app/schedule/schedule.module';

@Module({
  imports: [UsersModule, ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
