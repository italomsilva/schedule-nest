import { NotificationRepository } from "src/@core/domain/repositories/NotificationRepository";
import { Validator } from "src/@core/application/utils/validations/Validator";

export class GetNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(input: Input): Promise<Output[]> {
    this.validator(input);
    const { decodedToken, isRead, page } = input;

    const notifications = await this.notificationRepository.findByUser(
      decodedToken.userId,
      page,
      isRead,
    );

    return notifications.map((n) => formatNotification(n));
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        requireUser: true,
        fields: {
          page: {
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
  isRead?: boolean;
  page: number;
};

type Output = {
  id: string;
  isRead: boolean;
  title: string;
  subtitle: string;
  page: string;
  createdAt: Date;
};

function formatNotification(n: any): any {
  const {
    id,
    is_read,
    title,
    subtitle,
    page,
    variables,
    notification_created_at,
  } = n;

  return {
    id: id,
    isRead: is_read == 1,
    title: replaceVariables(title, variables),
    subtitle: replaceVariables(subtitle, variables),
    page: replaceVariables(page, variables),
    createdAt: notification_created_at,
  };
}

function replaceVariables(
  text: string,
  variables: Record<string, string>,
): string {
  let newText = text;

  for (const [key, value] of Object.entries(variables)) {
    newText = newText.replace(new RegExp('{{' + key + '}}', 'g'), value);
  }

  if (newText.includes('{') || newText.includes('}')) throw 'INVALID_VARIABLES';

  return newText;
}
