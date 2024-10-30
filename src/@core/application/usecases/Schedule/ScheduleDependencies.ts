import { ScheduleServiceRepository } from 'src/@core/domain/repositories/ScheduleServiceRepository';
import { ProfessionalRepository } from 'src/@core/domain/repositories/ProfessionalRepository';
import { UserRepository } from 'src/@core/domain/repositories/UserRepository';
import { Schedule } from 'src/@core/domain/entities/Schedule';
import { ProfessionalDependencies } from '../Professional/ProfessionalDependencies';

export class ScheduleDependencies {
  constructor(
    readonly userRepository: UserRepository,
    readonly scheduleServiceRepository: ScheduleServiceRepository,
    readonly professionalRepository: ProfessionalRepository,
    readonly professionalDependencies: ProfessionalDependencies,
  ) {}

  async get(schedule: Schedule): Promise<Output> {
    const [services, user, professional] = await Promise.all([
      this.scheduleServiceRepository.findServices(schedule.id),
      this.userRepository.findById(schedule.userId),
      this.professionalRepository.findById(schedule.professionalId),
    ]);

    const {
      specialties: professionalSpecialties,
      services: professionalServices,
      insurances: professionalInsurances,
    } = await this.professionalDependencies.get(professional);

    return {
      services,
      user,
      professional: {
        professional,
        specialties: professionalSpecialties,
        services: professionalServices,
        insurances: professionalInsurances,
      },
    };
  }
}

type Output = any;
