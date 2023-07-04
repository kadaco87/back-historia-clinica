import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose_delete from 'mongoose-delete';
import configuration from './configurations/configuration';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import Configuration from './configurations/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventMailModule } from './modules/mails/event-email.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UtilsModule } from './modules/utils/utils.module';

config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./environments/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
    MongooseModule.forRootAsync({
      useFactory: () => {
        console.log('*****   process.env.DB_URI     *****', Configuration().db);
        return {
          uri: Configuration().db,
          connectionFactory: (connection) => {
            connection.plugin(mongoose_delete, {
              overrideMethods: 'all',
            });
            return connection;
          },
        };
      },
    }),
    MailerModule.forRootAsync({
      useFactory: () => {
        console.log('emailConfig => ', Configuration().emailConfig);
        return {
          transport: {
            host: Configuration().emailConfig.host,
            auth: {
              user: Configuration().emailConfig.auth.user,
              pass: Configuration().emailConfig.auth.pass,
            },
          },
          defaults: {
            from: Configuration().emailConfig.from,
          },
          template: {
            dir: `${__dirname}/${Configuration().emailConfig.templatesFolder}`,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    EventEmitterModule.forRoot(),
    EventMailModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {}
