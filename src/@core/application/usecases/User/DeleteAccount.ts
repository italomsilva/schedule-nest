import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { DeviceRepository } from 'src/@core/domain/repositories/DeviceRepository';
import { NotificationRepository } from 'src/@core/domain/repositories/NotificationRepository';
import { RatingRepository } from 'src/@core/domain/repositories/RatingRepository';
import { ScheduleRepository } from 'src/@core/domain/repositories/ScheduleRepository';
import { ScheduleServiceRepository } from 'src/@core/domain/repositories/ScheduleServiceRepository';
import { UserRepository } from 'src/@core/domain/repositories/UserRepository';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class DeleteAccountUseCase {
  constructor(
    private userRepository: UserRepository,
    private deviceRepository: DeviceRepository,
    private ratingRepository: RatingRepository,
    private notificationRepository: NotificationRepository,
    private scheduleRepository: ScheduleRepository,
    private scheduleServiceRepository: ScheduleServiceRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);

    const { email } = input.decodedToken;

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new ErrorHandler('USER NOT FOUND');

    await Promise.all([
      this.deviceRepository.deleteByUser(user.id),
      this.notificationRepository.deleteByUser(user.id),
      this.ratingRepository.deleteByUser(user.id),
      this.scheduleServiceRepository.deleteByUser(user.id),
      this.scheduleRepository.deleteByUser(user.id),
    ]);
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {
          password: {
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
    email: string;
  };
  password: string;
};

type Output = any;
