import { Service } from '../../../domain/entities/Service';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ServiceRepository } from '../../../domain/repositories/ServiceRepository';
import { ProfessionalServiceRepository } from '../../../domain/repositories/ProfessionalServiceRepository';
import { formatService } from '../../utils/formatting/formatService';
import { ProfessionalService } from '../../../domain/entities/ProfessionalService';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class CreateServiceUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private serviceRepository: ServiceRepository,
    private professionalServiceRepository: ProfessionalServiceRepository,
  ) {}

  //WARNING: o codigo do curso  esta inserindo serviço com mesmo nome
  async execute(input: Input): Promise<Output> {
    const { decodedToken, name, price, duration, available } = input;

    this.validator(input);

    const professional = await this.professionalRepository.findByOwner(
      decodedToken.userId,
    );

    if (!professional) throw new ErrorHandler('PROFESSIONAL NOT FOUND');

    if (professional.ownerId != decodedToken.userId)
      throw new ErrorHandler('INVALID_PROFESSIONAL');

    const slotInterval = professional.slotInterval;

    if (duration % slotInterval !== 0)
      throw new ErrorHandler('INVALID DURATION');

    const service = Service.create(name, price, duration, available);

    await this.serviceRepository.save(service);

    const professionalService = ProfessionalService.create(
      professional.id,
      service.id,
    );

    await this.professionalServiceRepository.save(professionalService);

    return formatService(service);
  }

  validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {
          professionalId: {
            required: true,
          },
          name: {
            required: true,
          },
          price: {
            required: true,
          },
          duration: {
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
  name: string;
  price: number;
  duration: number;
  available: boolean;
};

type Output = {
  id: string;
  name: string;
  price: number;
  duration: number;
  available: boolean;
};
