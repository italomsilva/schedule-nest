import { Validator } from 'src/@core/application/utils/validations/Validator';
import { GetAvailableSlots } from './GetAvailableSlots';

export class GetSchedulingSlotsUseCase {
  constructor(private readonly getAvailableSlots: GetAvailableSlots) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const startDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);
    const { duration, professionalId } = input;

    const availableSlots = await this.getAvailableSlots.execute({
      professionalId,
      startDate,
      endDate,
      duration,
    });
    
    return availableSlots;
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        //obs: startDate endDate  parametros opcional e nao possuia validaçao
        requireUser: false,
        fields: {
          professionalId: {
            required: true,
          },
          duration: {
            required: true,
          },
          startDate: {
            required: true,
          },
          endDate: {
            required: true,
          },
        },
      },
      input,
    );
  }
}

type Input = {
  duration: number;
  professionalId: string;
  startDate: string;
  endDate: string;
};

type Output = any;
