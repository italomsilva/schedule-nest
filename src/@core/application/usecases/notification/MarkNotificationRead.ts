import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { NotificationRepository } from 'src/@core/domain/repositories/NotificationRepository';
import { Validator } from 'src/@core/application/utils/validations/Validator';

export class MarkNotificationReadUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const {
      decodedToken: { userId },
      notificationId,
    } = input;

    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) throw new ErrorHandler('NOTIFICATION NOT FOUND');

    if (notification.userId !== userId) throw new ErrorHandler('INVALID USER');

    await this.notificationRepository.markAsRead(notificationId);
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {
          notificationId: {
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
  notificationId: string;
};

type Output = void;
