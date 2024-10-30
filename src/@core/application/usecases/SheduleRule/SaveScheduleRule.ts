import { ScheduleRuleRepository } from '../../../domain/repositories/ScheduleRuleRepository';
import { ProfessionalRepository } from '../../../domain/repositories/ProfessionalRepository';
import { Professional } from '../../../domain/entities/Professional';
import { ScheduleRule } from '../../../domain/entities/ScheduleRule';
import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { Validator } from 'src/@core/application/utils/validations/Validator';

//WARNING: o codigo do curso esta inserindo slot iguais
export class SaveScheduleRuleUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private scheduleRuleRepository: ScheduleRuleRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const professional: Professional =
      await this.professionalRepository.findByOwner(input.decodedToken.userId);

    if (!professional || professional.ownerId != input.decodedToken.userId)
      throw new ErrorHandler('INVALID PROFESSIONAL');

    if (!input.slotInterval) throw new ErrorHandler('INVALID SLOT INTERVAL');

    const slots = input.slots;

    if (slots.some((s) => s.weekday > 7 || s.weekday < 1)) {
      throw new ErrorHandler('INVALID WEEKDAY');
    } else if (
      slots.some(
        (s) =>
          new Date(s.startTime).getTime() + input.slotInterval * 60 * 1000 >
          new Date(s.endTime).getTime(),
      )
    ) {
      throw new ErrorHandler('INVALID SLOTS');
    }

    for (let weekday = 1; weekday <= 7; weekday++) {
      const daySlots = slots.filter((s) => s.weekday === weekday);
      if (daySlots.length === 0 || daySlots.length === 1) {
        continue;
      }

      daySlots.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );

      for (let slotIndex = 0; slotIndex < daySlots.length - 1; slotIndex++) {
        if (
          new Date(daySlots[slotIndex].endTime).getTime() >
          new Date(daySlots[slotIndex + 1].startTime).getTime()
        ) {
          throw new ErrorHandler('INVALID SLOTS');
        }
      }
    }

    await this.scheduleRuleRepository.deleteAllByProfessional(professional.id);
    
    const slotsCreate = ScheduleRule.createFromArray(professional.id, slots);

    await this.scheduleRuleRepository.saveMany(slotsCreate);

    professional.slotInterval = input.slotInterval;
    professional.finishedProfile = true;
    await this.professionalRepository.save(professional);
  }

  validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {
          professionalId: {
            required: true,
          },
          slotInterval: {
            required: true,
          },
          slots: {
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
  slotInterval: number;
  slots: {
    weekday: number;
    startTime: string;
    endTime: string;
  }[];
};

type Output = void;
