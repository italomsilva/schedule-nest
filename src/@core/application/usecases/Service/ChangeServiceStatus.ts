import { ServiceRepository } from '../../../domain/repositories/ServiceRepository';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ProfessionalServiceRepository } from '../../../domain/repositories/ProfessionalServiceRepository';
import { formatService } from '../../utils/formatting/formatService';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class ChangeServiceStatusUseCase {
  constructor(
    private serviceRepository: ServiceRepository,
    private professionalRepository: ProfessionalRepository,
    private professionalServiceRepository: ProfessionalServiceRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);

    const professional = await this.professionalRepository.findById(
      input.professionalId,
    );

    if (!professional) throw new ErrorHandler('PROFESSIONAL NOT FOUND');

    const services = await this.professionalServiceRepository.findServices(
      professional!.id,
    );

    const service = services.find((s) => s.id == input.serviceId);

    if (!service) throw new ErrorHandler('SERVICE NOT FOUND');

    service.available = input.available;
    service.updatedAt = new Date();

    await this.serviceRepository.update(service);
    return formatService(service);
  }

  validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: false,
        fields: {
          professionalId: {
            required: false,
          },
          serviceId: {
            required: true,
          },
          available: {
            required: true,
          },
        },
      },
      input,
    );
  }
}

type Input = {
  professionalId: string;
  serviceId: string;
  available: boolean;
};

type Output = {
  id: string;
  name: string;
  price: number;
  duration: number;
  available: boolean;
};
