import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose_delete from 'mongoose-delete';
import configuration from './configurations/configuration';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

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
        console.log('*****   process.env.DB_URI     *****', process.env.DB_URI);
        return {
          uri: process.env.DB_URI,
          connectionFactory: (connection) => {
            connection.plugin(mongoose_delete, {
              overrideMethods: 'all',
            });
            console.log('******  mongo conection  ****** ', process.env.DB_URI);
            return connection;
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {}
