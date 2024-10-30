import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ScheduleRepository } from '../../../domain/repositories/ScheduleRepository';
import { ScheduleServiceRepository } from '../../../domain/repositories/ScheduleServiceRepository';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { GetAvailableSlots } from './GetAvailableSlots';
import { ProfessionalServiceRepository } from '../../../domain/repositories/ProfessionalServiceRepository';
import { Schedule } from '../../../domain/entities/Schedule';
import { ScheduleService } from '../../../domain/entities/ScheduleService';
import { formatSchedule, OutputSchedule } from '../../utils/formatting/formatSchedule';
import { ProfessionalDependencies } from '../Professional/ProfessionalDependencies';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class ScheduleServicesUseCase {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly professionalRepository: ProfessionalRepository,
    private readonly scheduleServiceRepository: ScheduleServiceRepository,
    private readonly userRepository: UserRepository,
    private readonly getAvailableSlots: GetAvailableSlots,
    private readonly serviceRepository: ProfessionalServiceRepository,
    private readonly professionalDependencies: ProfessionalDependencies,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const { professionalId, serviceIds } = input;

    const startDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);

    const professional =
      await this.professionalRepository.findById(professionalId);

    if (!professional) throw new ErrorHandler('PROFESSIONAL NOT FOUND');

    const professionalServices =
      await this.serviceRepository.findServices(professionalId);
    const services = professionalServices.filter((service) =>
      serviceIds.includes(service.id),
    );

    if (services.length !== serviceIds.length)
      throw new ErrorHandler('INVALID SERVICES');

    const duration = services.reduce(
      (partialSum, service) => partialSum + service.duration,
      0,
    );

    const availableSlots = await this.getAvailableSlots.execute({
      professionalId,
      startDate,
      endDate,
      duration,
    });

    const isAvailable = availableSlots.some((day) =>
      day.slots.some(
        (slot) =>
          slot.startDate === startDate.toISOString() &&
          slot.endDate === endDate.toISOString(),
      ),
    );

    if (!isAvailable) throw new ErrorHandler('SLOT UNAVAILABLE');

    const user = await this.userRepository.findById(input.decodedToken.userId);

    const newSchedule = Schedule.create({
      userId: input.decodedToken.userId,
      professionalId,
      endDate: endDate,
      startDate: startDate,
      status: 'active',
      block: false,
      sentRateNotification: false,
    });

    const scheduleServices = services.map((service) =>
      ScheduleService.create(newSchedule.id, service.id),
    );

    await Promise.all([
      this.scheduleServiceRepository.saveMany(scheduleServices),
      this.scheduleRepository.save(newSchedule),
    ]);

    const professionalDependencies =
      await this.professionalDependencies.get(professional);

    return formatSchedule(newSchedule, user, services, {
      professional,
      services: professionalDependencies.services,
      specialties: professionalDependencies.specialties,
      insurances: professionalDependencies.insurances,
    });
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        //obs: todos os parametros opcional e nao possuia validaçao
        requireUser: true,
        fields: {
          professionalId: {
            required: true,
          },
          serviceIds: {
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
      input,
    );
  }
}

type Input = {
  decodedToken: {
    userId: string;
  };
  professionalId: string;
  serviceIds: string[];
  startDate: Date;
  endDate: Date;
};

type Output = OutputSchedule;
