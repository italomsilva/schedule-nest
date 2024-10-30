import { ProfessionalInsuranceRepository } from '../../../domain/repositories/ProfessionalInsuranceRepository';
import { ProfessionalServiceRepository } from '../../../domain/repositories/ProfessionalServiceRepository';
import { ProfessionalSpecialtyRepository } from '../../../domain/repositories/ProfessionalSpecialtyRepository';
import { Professional } from '../../../domain/entities/Professional';

export class ProfessionalDependencies {
  constructor(
    readonly specialtyRepository: ProfessionalSpecialtyRepository,
    readonly serviceRepository: ProfessionalServiceRepository,
    readonly insuranceRepository: ProfessionalInsuranceRepository,
  ) {}

  async get(professional: Professional): Promise<any> {
    const [specialties, services, insurances] = await Promise.all([
      this.specialtyRepository.findSpecialties(professional.id),
      this.serviceRepository.findServices(professional.id),
      this.insuranceRepository.findInsurances(professional.id),
    ]);

    return { specialties, services, insurances };
  }
}
