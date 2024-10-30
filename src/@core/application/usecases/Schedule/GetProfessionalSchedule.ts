import { ProfessionalRepository } from 'src/@core/domain/repositories/ProfessionalRepository';
import { ScheduleRepository } from 'src/@core/domain/repositories/ScheduleRepository';
import { ScheduleDependencies } from './ScheduleDependencies';
import {
  OutputSchedule,
  formatSchedule,
} from '../../utils/formatting/formatSchedule';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class GetProfessionalScheduleUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly professionalRepository: ProfessionalRepository,
    private readonly scheduleDependencies: ScheduleDependencies,
  ) {}

  async execute(input: Input): Promise<Output[]> {
    this.validator(input);
    const professional = await this.professionalRepository.findById(
      input.professionalId,
    );
    if (professional.ownerId !== input.decodedToken.userId) throw new ErrorHandler('INVALID PROFESSIONAL');

    const schedules = await this.scheduleRepository.findActiveByDateRange(
      input.professionalId,
      new Date(input.startDate),
      new Date(input.endDate),
    );

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

  private validator(input:Input){
    Validator.requiredFields(
      {
        //obs: professionalId estava sem validação
        requireUser: true,
        fields: {
          professionalId: {
            required: true,
          },
          startDate: {
            required: true,
          },
          endDate: {
            required: true,
          },
        },
      },
      input
    )
  }


}

type Input = {
  professionalId: string;
  decodedToken: {
    userId: string;
  };
  startDate: Date;
  endDate: Date;
};

type Output = OutputSchedule;
