import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { GetAvailableSlots } from './GetAvailableSlots';
import { Schedule } from '../../../domain/entities/Schedule';
import { ScheduleDependencies } from './ScheduleDependencies';
import { formatSchedule } from '../../utils/formatting/formatSchedule';
import { ScheduleRepository } from '../../../domain/repositories/ScheduleRepository';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class ReserveSlotsUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private getAvailableSlots: GetAvailableSlots,
    private scheduleRepository: ScheduleRepository,
    private scheduleDependencies: ScheduleDependencies,
  ) {}

  async execute(input: Input) {
    this.validator(input);
    const professional = await this.professionalRepository.findByOwner(
      input.decodedToken.userId,
    );

    if (!professional) throw new ErrorHandler('PROFESSIONAL NOT FOUND');

    if (professional.ownerId != input.decodedToken.userId) throw new ErrorHandler('INVALID PROFESSIONAL');

    const startDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);
    const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

    const days = await this.getAvailableSlots.execute({
      duration,
      professionalId: professional.id,
      startDate,
      endDate,
    });

    if (days[0].slots.length == 0) throw new ErrorHandler('INVALID SLOT');

    const schedule = Schedule.create({
      userId: input.decodedToken.userId,
      professionalId: professional.id,
      endDate,
      startDate,
      status: 'active',
      block: true,
      sentRateNotification: false,
    });

    await this.scheduleRepository.save(schedule);

    const {
      services,
      professional: professionalSchedule,
      user: userSchedule,
    } = await this.scheduleDependencies.get(schedule);

    return formatSchedule(schedule, userSchedule, services, {
      professional: professionalSchedule.professional,
      specialties: professionalSchedule.specialties,
      services: professionalSchedule.services,
      insurances: professionalSchedule.insurances,
    });
  }

  private validator(input:Input){
    Validator.requiredFields(
      {
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
  decodedToken: {
    userId: string;
  };
  professionalId: string;
  startDate: string;
  endDate: string;
};
