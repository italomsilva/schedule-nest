import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { ScheduleRuleRepository } from '../../../domain/repositories/ScheduleRuleRepository';
import { formatSlots } from 'src/@core/application/utils/formatting/formatSlots';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class GetProfessionalInternalSlotsUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private scheduleRuleRepository: ScheduleRuleRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const professional = await this.professionalRepository.findById(
      input.professionalId,
    );

    if (!professional) throw new ErrorHandler('PROFESSIONAL NOT FOUND');

    if (professional.ownerId != input.decodedToken.userId)
      throw new ErrorHandler('INVALID PROFESSIONAL');

    const slots = await this.scheduleRuleRepository.findAllByIdProfessional(
      professional.id,
    );

    return {
      slotInterval: professional.slotInterval,
      slots: formatSlots(slots),
    };
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        //obs: Parse not requireUser
        requireUser: true,
        fields: {
          professionalId: {
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
};

type Output = {
  slotInterval: number;
  slots: any;
};
