import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import Configuration from '../../configurations/configuration';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: Configuration().jwtSecretKey, // process.env.JWT_SECRET_KEY,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
