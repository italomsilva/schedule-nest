import { ErrorHandler } from 'src/@core/domain/entities/ErrorHandler';
import { NotificationGateway } from 'src/@core/domain/gateway/NotificationGateway';
import { DeviceRepository } from 'src/@core/domain/repositories/DeviceRepository';
import { NotificationRepository } from 'src/@core/domain/repositories/NotificationRepository';
import { Validator } from 'src/@core/application/utils/validations/Validator';
import { Notification } from 'src/@core/domain/entities/Notification';
import { Device } from 'src/@core/domain/entities/Device';

export class SendPushNotificationUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private deviceRepository: DeviceRepository,
    private notificationGateway: NotificationGateway,
  ) {}

  async execute(input: Input): Promise<Output | null> {
    this.validator(input);
    const { userId, dynamicNotificationKey, variables } = input;

    const user = await this.notificationRepository.findUserById(userId);

    if (!user) throw new ErrorHandler('USER NOT FOUND');
    
    const dynamicNotification =
      await this.notificationRepository.findDynamicByKey(
        dynamicNotificationKey,
      );

    if (!dynamicNotification)
      throw new ErrorHandler('DYNAMIC NOTIFICATION NOT FOUND');

    const title = this.replaceVariables(dynamicNotification.title, variables);

    const subtitle = this.replaceVariables(
      dynamicNotification.subtitle,
      variables,
    );

    const notification = Notification.create({
      isRead: false,
      userId,
      dynamicNotificationId: dynamicNotification.id,
      variables,
    });

    await this.notificationRepository.save(notification);

    const devices = await this.deviceRepository.findDevicesByUserId(userId);

    const registrationTokens = devices.map((d: Device) => d.fcmToken);

    if (registrationTokens.length === 0) return null;

    const data = {
      notification: JSON.stringify({
        id: notification.id,
        isRead: notification.isRead,
        title,
        subtitle,
        page: dynamicNotification.page,
        createdAt: notification.createdAt,
      }),
    };

    const result = await this.notificationGateway.sendPush(
      registrationTokens,
      title,
      subtitle,
      data,
    );

    return result;
  }

  private replaceVariables(
    text: string,
    variables: Record<string, string>,
  ): string {
    let newText = text;

    for (const [key, value] of Object.entries(variables)) {
      newText = newText.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    if (newText.includes('{') || newText.includes('}')) {
      throw new ErrorHandler('INVALID VARIABLES');
    }

    return newText;
  }

  private validator(input: Input) {
    Validator.requiredFields(
      {
        //obs: sem campos obrigatorios
        requireUser: false,
        fields: {
          userId: {
            required: true,
          },
          dynamicNotificationKey: {
            required: true,
          },
          variables: {
            required: true,
          },
        },
      },
      input,
    );
  }
}

type Input = {
  userId: string;
  dynamicNotificationKey: string;
  variables: Record<string, string>;
};

type Output = any;
