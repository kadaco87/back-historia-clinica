import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(identification: string, password: string) {
    const user = await this.authService.validateUser(identification, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
