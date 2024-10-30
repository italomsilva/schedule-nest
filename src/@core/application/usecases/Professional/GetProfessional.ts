import {
  ProfessionalOutput,
  formatProfessional,
} from '../../utils/formatting/formatProfessional';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ProfessionalDependencies } from './ProfessionalDependencies';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class GetProfessionalUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private professionalDependencies: ProfessionalDependencies,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);

    if (!input.professionalId) {
      throw new ErrorHandler('INVALID PROFESSIONAL ID');
    }

    const professional = await this.professionalRepository.findById(
      input.professionalId,
    );

    if (!professional) throw new ErrorHandler('PROFESSIONAL NOT FOUND');

    const { specialties, services, insurances } =
      await this.professionalDependencies.get(professional);

    return formatProfessional(professional, specialties, services, insurances);
  }

  private validator(input:Input){
    Validator.requiredFields(
      {
        requireUser: false,
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
};

type Output = ProfessionalOutput;

export { formatProfessional, ProfessionalOutput };
