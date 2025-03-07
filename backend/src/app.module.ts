import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './event/event.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule, ScheduleModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
