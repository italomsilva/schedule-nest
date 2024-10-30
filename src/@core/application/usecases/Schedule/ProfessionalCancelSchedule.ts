import { ScheduleRepository } from '../../../domain/repositories/ScheduleRepository';
import { formatSchedule } from '../../utils/formatting/formatSchedule';
import { ScheduleDependencies } from './ScheduleDependencies';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';
import { SendPushNotificationUseCase } from '../notification/SendPushNotification';

export class ProfessionalCancelScheduleUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly scheduleDependencies: ScheduleDependencies,
    private readonly sendPushNotificationUseCase: SendPushNotificationUseCase,
  ) {}
  async execute(input: Input): Promise<Output> {
    this.validator(input);
    let schedule = await this.scheduleRepository.findById(input.scheduleId);

    if (!schedule) throw new ErrorHandler('SCHEDULE NOT FOUND');

    const {
      services,
      professional,
      user: userSchedule,
    } = await this.scheduleDependencies.get(schedule);

    const { professional: professionalSchedule } = professional;

    if (!professionalSchedule) throw new ErrorHandler('PROFESSIONAL NOT FOUND');

    if (input.decodedToken.userId != professionalSchedule.ownerId)
      throw new ErrorHandler('INVALID USER');

    schedule.status = 'canceled';
    schedule.sentRateNotification = true;
    await this.scheduleRepository.update(schedule);

    if (!schedule.block) {
      const variables = {
        professional_name: professionalSchedule.name,
        schedule_id: schedule.id,
      };
      const result = await this.sendPushNotificationUseCase.execute({
        dynamicNotificationKey: process.env.NOTIFICATION_KEY,
        variables,
        userId: input.decodedToken.userId,
      });

      console.log(result);
    }

    return formatSchedule(schedule, userSchedule, services, {
      professional: professionalSchedule,
      specialties: professional.specialties,
      services: professional.services,
      insurances: professional.insurances,
    });
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {
          scheduleId: {
            required: true,
          },
        },
      },
      input,
    );
  }
}

type Input = {
  decodedToken: {
    userId: string;
  };
  scheduleId: string;
};

type Output = {};
