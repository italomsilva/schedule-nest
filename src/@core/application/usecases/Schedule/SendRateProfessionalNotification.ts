import { ScheduleRepository } from '../../../domain/repositories/ScheduleRepository';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { SendPushNotificationUseCase } from '../notification/SendPushNotification';

export class SendRateProfessionalNotificationUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private professionalRepository: ProfessionalRepository,
    private sendPushNotificationUseCase: SendPushNotificationUseCase,
  ) {}

  async execute(): Promise<void> {
    const today = new Date();

    const schedules =
      await this.scheduleRepository.findNotificationsToSend(today);

    if (!schedules || schedules.length === 0) {
      throw new ErrorHandler('SCHEDULE NOT FOUND');
    }

    const promises = schedules.map(async (schedule) => {
      try {
        const professional = await this.professionalRepository.findById(
          schedule.professionalId,
        );
        const professionalName = professional.name;

        const variables = {
          professional_name: professionalName,
          professional_id: schedule.professionalId,
        };

        await this.sendPushNotificationUseCase.execute({
          dynamicNotificationKey: process.env.NOTIFICATION_KEY,
          variables,
          userId: schedule.userId,
        });

        schedule.sentRateNotification = true;
        await this.scheduleRepository.update(schedule);
      } catch (err) {
        console.error(err);
      }
    });

    await Promise.resolve(promises);
  }
}
