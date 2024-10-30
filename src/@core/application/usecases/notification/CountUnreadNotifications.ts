import { NotificationRepository } from "src/@core/domain/repositories/NotificationRepository";
import { Validator } from "src/@core/application/utils/validations/Validator";

export class CountUnreadNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    this.validator(input);
    const userId = input.decodedToken.userId;
    const count = await this.notificationRepository.countUnread(userId);
    return Number(count);
  }
  private validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {},
      },
      input,
    );
  }
}

type Input = {
  decodedToken: {
    userId: string;
  };
};

type Output = number;
