export interface NotificationGateway {
    sendPush(
      registrationTokens: string[],
      title: string,
      body: string,
      data: any,
    ): Promise<any>;
  }
  