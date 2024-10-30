import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { CheckAPIKeyMiddleware } from './CheckApiKey';
import { CheckLoggedMiddleware } from './CheckLogged';

@Global()
export class Middleware {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAPIKeyMiddleware)
      .forRoutes('*')
      .apply(CheckLoggedMiddleware)
      .forRoutes(
        'v1-mark-notification-read',
        'v1-get-notifications',
        'v1-count-unread-notifications',
        'v1-save-schedule-rule',
        'v1-create-service',
        'v1-change-service-status',
        'v1-edit-professional',
        'v1-register-device',
        'v1-get-user',
        'v1-get-professional-internal-profile',
        'v1-change-password',
        'v1-edit-profile',
        'v1-get-schedule',
        'v1-cancel-schedule',
        'v1-get-professional-agenda',
        'v1-schedule-services',
        'v1-get-user-schedules',
        'v1-get-linked-professional',
        'v1-professional-cancel-schedule',
        'v1-reserve-slot',
        'v1-get-professional-ratings',
        'v1-rate-professional',
        'v1-get-professional-internal-services',
        'v1-get-professional-internal-slots'
      );
  }
}
