import { ProfessionalRepository } from 'src/@core/domain/repositories/ProfessionalRepository';
import { ScheduleRepository } from 'src/@core/domain/repositories/ScheduleRepository';
import { formatSchedule } from '../../utils/formatting/formatSchedule';
import { ScheduleDependencies } from './ScheduleDependencies';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class GetUserSchedulesUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private scheduleRepository: ScheduleRepository,
    private scheduleDependencies: ScheduleDependencies,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);

    let schedules = [];

    if (input.futures != null) {
      if (input.futures) {
        schedules = await this.scheduleRepository.findFutureSchedules(
          input.decodedToken.userId,
          input.page,
        );
      } else {
        schedules = await this.scheduleRepository.findPastSchedules(
          input.decodedToken.userId,
          input.page,
        );
      }
    } else {
      schedules = await this.scheduleRepository.findAllSchedules(
        input.decodedToken.userId,
        input.page,
      );
    }

    const formattedSchedules = await Promise.all(
      schedules.map(async (schedule) => {
        const { services, user, professional } =
          await this.scheduleDependencies.get(schedule);

        return formatSchedule(schedule, user, services, {
          professional: professional.professional,
          specialties: professional.specialties,
          services: professional.services,
          insurances: professional.insurances,
        });
      }),
    );

    return formattedSchedules;
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        //obs: page estava sem validação
        requireUser: false,
        fields: {
          page: {
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
  page: number;
  futures: boolean;
};

type Output = {};
