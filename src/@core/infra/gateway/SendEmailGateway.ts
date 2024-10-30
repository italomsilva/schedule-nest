import { EmailGateway } from '../../domain/gateway/EmailGateway';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

export class SendEmailGateway implements EmailGateway {
  getMailersend(): MailerSend {
    const mailersend = new MailerSend({
      apiKey: process.env.MAILERSEND_KEY,
    });

    return mailersend;
  }

  async sendResetPasswordCode(
    fullName: string,
    email: string,
    code: any,
  ): Promise<void> {
    const recipients = [new Recipient(email, fullName)];

    const sentFrom = new Sender(process.env.SENDER_EMAIL, 'Test email');

    const personalization = [
      {
        email: email,
        data: {
          code: code,
          name: fullName,
        },
      },
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setTemplateId('pxkjn41jp104z781')
      .setPersonalization(personalization)
      .setSubject('This is a Subject'); //TODO: ajustar subject

    await this.getMailersend().email.send(emailParams);
  }
}
