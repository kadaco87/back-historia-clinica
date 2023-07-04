import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import Configuration from '../../configurations/configuration';
@Module({})
export class EventMailModule {
  constructor(private readonly mailService: MailerService) {
    console.log('EventMailModule start now');
  }
  @OnEvent('user.login')
  handleUserLoginEvent(user: any) {
    console.log('_____USER LOGIN EVENT_____', user);
    // send email
  }
  @OnEvent('user.created')
  handleUserCreateEvent(user: any) {
    this.mailService
      .sendMail({
        to: user.email,
        subject: 'Bienvenido a Krensi',
        template: 'welcome',
        context: {
          names: user.names,
          surnames: user.surnames,
          url: `${process.env.SITE_URL}/#/auth/login`,
        },
      })
      .then((r) => console.log(r))
      .catch((error) => console.log({ error }));
  }
  @OnEvent('email.reset')
  handleUserForgotPasswordEvent(data: { user: any; token: string }) {
    console.log('_____USER PASSWORD RECOVERY EVENT_____', data);
    // send email
    this.mailService
      .sendMail({
        to: data.user.email,
        subject:
          'Enlace para restablecer la contraseña de tu cuenta en TechClinic.',
        template: 'reset-password',
        context: {
          names: `${data.user.firstName}`,
          surnames: `${data.user.lastname}`,
          resetPasswordToken: `http://${
            Configuration().siteUrl
          }/#/auth/reset-password?token=${data.token}`,
        },
      })
      .then((response) => console.log('response success', response))
      .catch((error) => console.log('response error', error));
  }
}
