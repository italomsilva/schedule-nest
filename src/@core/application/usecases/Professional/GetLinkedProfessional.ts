import { Validator } from 'src/@core/application/utils/validations/Validator';
import { Professional } from '../../../domain/entities/Professional';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';

export class GetLinkedProfessionalUseCase {
  constructor(private professionalRepository: ProfessionalRepository) {}

  async execute(input: Input): Promise<Output | null> {
    this.validator(input);
    const professional = await this.professionalRepository.findByOwner(
      input.decodedToken.userId,
    );

    if (!professional) {
      return null;
    }
    return {
      id: professional.id,
      name: professional.name,
      picture: professional.profileImageUrl
        ? professional.profileImageUrl
        : null,
      finishedProfile: isProfessionalValid(professional),
    };
  }

  private validator(input:Input){
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {}
      },
      input
    )
  }
}
function isStringValid(str: string | null | undefined): boolean {
  return str !== null && str !== undefined && str.trim() !== '';
}

function isProfessionalValid(professional: Professional): boolean {
  return (
    isStringValid(professional.name) && professional.crm !== 0,
    isStringValid(professional.address) &&
      isStringValid(professional.phone) &&
      isStringValid(professional.profileImageUrl) &&
      isStringValid(professional.location) &&
      isStringValid(professional.ownerId)
  );

  
}

type Output = {
  id: string;
  name: string;
  picture: string | null;
  finishedProfile: boolean;
};

type Input = {
  decodedToken: {
    userId: string;
  };
};
