import { sendRateProfessionalNotificationUseCase } from '../../../@core/di/di';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class NotifyProfessionalRateJob {
  private readonly logger = new Logger(NotifyProfessionalRateJob.name);

  @Cron(process.env.CRON_NOTIFICATION, {
    name: 'notifications',
    timeZone: 'America/Sao_Paulo',
  })
  async triggerNotifications() {
    try {
      this.logger.warn('----CRON START----');
      await sendRateProfessionalNotificationUseCase.execute();
      this.logger.log('Notifications sent successfully.');
    } catch (error) {
      if (error.message === 'SCHEDULE NOT FOUND') {
        this.logger.warn('No notifications found to send.');
      } else {
        this.logger.error('Error:', error.stack);
      }
    }
    this.logger.warn('----CRON END----');
  }
}
