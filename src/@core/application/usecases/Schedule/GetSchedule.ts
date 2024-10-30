import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { ScheduleRepository } from '../../../domain/repositories/ScheduleRepository';
import { OutputSchedule, formatSchedule } from '../../utils/formatting/formatSchedule';
import { ScheduleDependencies } from './ScheduleDependencies';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class GetScheduleUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly scheduleDependencies: ScheduleDependencies,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const schedule = await this.scheduleRepository.findById(input.scheduleId);

    if (!schedule) throw new ErrorHandler('SCHEDULE NOT FOUND');

    if (input.decodedToken.userId != schedule.userId) {
      throw new ErrorHandler('INVALID USER');
    }

    const { services, user, professional } =
      await this.scheduleDependencies.get(schedule);

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
  scheduleId: string;
  decodedToken: {
    userId: string;
  };
};

type Output = OutputSchedule;
