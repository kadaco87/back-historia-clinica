import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET_KEY,
          signOptions: { expiresIn: '60s' },
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
