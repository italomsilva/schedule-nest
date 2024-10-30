import { Module } from '@nestjs/common';
import { NotificationModule } from './modules/notification/Module';
import { AuthModule } from './modules/auth/Module';
import { DatabaseModule } from './modules/database/module';
import { Middleware } from './modules/Middleware/Module';
import { SchedulingModule } from './modules/scheduling/Module';

@Module({
  imports: [
    DatabaseModule,
    NotificationModule,
    AuthModule,
    Middleware,
    SchedulingModule,
  ],
})
export class RootModule {}
