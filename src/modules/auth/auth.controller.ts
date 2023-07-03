import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ApiTags } from "@nestjs/swagger";
import { RegisterDto } from "./dtos/register.dto";
import { ForgotPasswordDto } from "./dtos/forgotPassword.dto";

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }
  @Post('recovery-password')
  recoveryPassword(@Body() body) {
    return this.authService.recoveryPassword(body);
  }
  @Post('change-password')
  changePassword(@Body() body) {
    return this.authService.changePassword(body);
  }

  @Get('profile')
  getProfile(@Query('id') id: number, @Query('password') password) {
    console.log({ password });
    return this.authService.getProfile(+id);
  }
}
