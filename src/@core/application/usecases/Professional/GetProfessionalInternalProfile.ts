import {
  formatInternalProfessional,
  ProfessionalInternalOutput,
} from '../../utils/formatting/formatInternalProfessional';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ProfessionalDependencies } from './ProfessionalDependencies';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class GetProfessionalInternalProfileUseCase {
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

    if (professional.ownerId != input.decodedToken.userId)
      throw new ErrorHandler('INVALID PROFESSIONAL');

    const { specialties, insurances } =
      await this.professionalDependencies.get(professional);

    return formatInternalProfessional(professional, specialties, insurances);
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
  professionalId: string;
  decodedToken: {
    userId: string;
  };
};

type Output = ProfessionalInternalOutput;
