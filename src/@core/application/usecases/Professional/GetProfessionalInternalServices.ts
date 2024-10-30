import { formatService, ServiceOutput } from '../../utils/formatting/formatService';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ProfessionalDependencies } from './ProfessionalDependencies';
import { Service } from '../../../domain/entities/Service';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class GetProfessionalInternalServicesUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private professionalDependencies: ProfessionalDependencies,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);

    const professional = await this.professionalRepository.findById(
      input.professionalId,
    );

    if (!professional) throw new ErrorHandler('PROFESSIONAL NOT FOUND');

    if (professional.ownerId != input.decodedToken.userId) throw new ErrorHandler('INVALID PROFESSIONAL');
    
    const { services } = await this.professionalDependencies.get(professional);

    return services.map((service: Service) => {
      return formatService(service);
    });
  }

  private validator(input:Input){
    Validator.requiredFields(
      {
        //obs: Parse not requireUser
        requireUser: true,
        fields: {
          professionalId:{
            required: true,
          },
        }
      },
      input
    )
  }

}

type Input = {
  decodedToken:{
    userId: string
  }
  professionalId: string;
};

type Output = ServiceOutput[];
