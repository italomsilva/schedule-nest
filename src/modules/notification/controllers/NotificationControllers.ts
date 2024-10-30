import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CountUnreadNotificationsUseCase } from 'src/@core/application/usecases/notification/CountUnreadNotifications';
import { GetNotificationsUseCase } from 'src/@core/application/usecases/notification/GetNotifications';
import { MarkNotificationReadUseCase } from 'src/@core/application/usecases/notification/MarkNotificationRead';
import { RegisterDeviceUseCase } from 'src/@core/application/usecases/notification/RegisterDevice';
import { SendPushNotificationUseCase } from 'src/@core/application/usecases/notification/SendPushNotification';

@Controller()
export class NotificationController {
  constructor(
    private readonly registerDeviceUseCase: RegisterDeviceUseCase,
    private readonly getNotificationsUseCase: GetNotificationsUseCase,
    private readonly countUnreadNotificationsUseCase: CountUnreadNotificationsUseCase,
    private readonly markNotificationReadUseCase: MarkNotificationReadUseCase,
    private readonly sendPushNotificationUseCase: SendPushNotificationUseCase,
  ) {}

  @Post('v1-register-device')
  async registerDevice(
    @Body() body,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.registerDeviceUseCase.execute(body);
      return response.status(HttpStatus.OK).send();
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-get-notifications')
  async getNotifications(@Body() body, @Res() response: Response) {
    try {
      const output = await this.getNotificationsUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-count-unread-notifications')
  async countUnreadNotifications(
    @Body() body,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const count = await this.countUnreadNotificationsUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: count });
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-mark-notification-read')
  async markNotificationRead(
    @Body() body,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.markNotificationReadUseCase.execute(body);
      return response.status(HttpStatus.OK).send();
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }

  @Post('v1-send-push-notification')
  async sendPushNotification(
    @Body() body,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const output = await this.sendPushNotificationUseCase.execute(body);
      return response.status(HttpStatus.OK).send({ result: output });
    } catch (error: any) {
      console.log(error);
      const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      return response.status(statusCode).send({ error: error.message });
    }
  }
}
