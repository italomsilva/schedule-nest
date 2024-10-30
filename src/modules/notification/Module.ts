import { Module } from '@nestjs/common';
import { RegisterDeviceUseCase } from '../../@core/application/usecases/notification/RegisterDevice';
import { NotificationController } from './controllers/NotificationControllers';
import { GetNotificationsUseCase } from 'src/@core/application/usecases/notification/GetNotifications';
import { CountUnreadNotificationsUseCase } from 'src/@core/application/usecases/notification/CountUnreadNotifications';
import { MarkNotificationReadUseCase } from 'src/@core/application/usecases/notification/MarkNotificationRead';
import { SendPushNotificationUseCase } from 'src/@core/application/usecases/notification/SendPushNotification';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  registerDeviceUseCase,
  getNotificationsUseCase,
  countUnreadNotificationsUseCase,
  markNotificationReadUseCase,
  sendPushNotificationUseCase,
} from 'src/@core/di/di';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 1,
        limit: 10,
      },
    ]),
  ],
  providers: [
    {
      provide: RegisterDeviceUseCase,
      useValue: registerDeviceUseCase,
    },
    {
      provide: GetNotificationsUseCase,
      useValue: getNotificationsUseCase,
    },
    {
      provide: CountUnreadNotificationsUseCase,
      useValue: countUnreadNotificationsUseCase,
    },
    {
      provide: MarkNotificationReadUseCase,
      useValue: markNotificationReadUseCase,
    },
    {
      provide: SendPushNotificationUseCase,
      useValue: sendPushNotificationUseCase,
    },
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
