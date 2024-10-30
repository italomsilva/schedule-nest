import { ScheduleRepository } from 'src/@core/domain/repositories/ScheduleRepository';
import { OutputSchedule, formatSchedule } from '../../utils/formatting/formatSchedule';
import { ScheduleDependencies } from './ScheduleDependencies';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class CancelScheduleUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly scheduleDependencies: ScheduleDependencies,
  ) {}
  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const schedule = await this.scheduleRepository.findById(input.scheduleId);

    if (!schedule) {
      throw new ErrorHandler('SCHEDULE NOT FOUND');
    }

    if (schedule.userId != input.decodedToken.userId) {
      throw new ErrorHandler('INVALID USER');
    }

    const { services, user, professional } =
      await this.scheduleDependencies.get(schedule);

    schedule.status = 'canceled';
    schedule.updatedAt = new Date();

    await this.scheduleRepository.update(schedule);

    return formatSchedule(schedule, user, services, {
      professional: professional.professional,
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

type Output = OutputSchedule;
