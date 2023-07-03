import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dtos/forgotPassword.dto';

@Injectable()
export class AuthService {
  userList = [];

  constructor(private jwtService: JwtService) {}

  async login(body: LoginDto) {
    // TODO: crear logica que va a permitir autenticar al usuario en el sistema
    const index = this.getUserIndex(body.identification);
    const user = this.userList[index];

    if (!user && user.password !== body.password)
      throw new UnauthorizedException();

    const payload = { userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  register(body: RegisterDto) {
    // TODO: crear logica que va a permitir crear al usuario en la base de datos
    const user = {
      ...body,
      id: this.userList.length + 1,
    };
    this.userList.push(user);
    return user;
  }

  forgotPassword(body: ForgotPasswordDto) {
    // TODO: crear logica que va a permitir iniciar el proceso de recuperacion de password de un usuario
    const index = this.getUserIndex(body.identification);
    const user = this.userList[index];
    if (user) {
      // TODO: Enviar email de recuperacion de contraseña

      return true;
    }
  }

  recoveryPassword(body) {
    // TODO: crear logica que va a permitir cambiar la contraseña del usuario desde enlace en email de recuperar contraseña
    return body;
  }

  changePassword(body) {
    // TODO: crear logica que va a permitir cambiar la contraseña desde el perfil del usuario
    return body;
  }

  getProfile(id: number) {
    const user = this.userList.filter((user) => user.id === id)[0];
    if (user) return user;
    return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  getUserIndex(identification: string): number {
    const index = this.userList.findIndex(
      (user) => user.identification === identification,
    );
    if (index !== -1) return index;
    throw new HttpException(
      'Error, no se encontro ningun registro, por favor verifica la información.',
      HttpStatus.NOT_FOUND,
    );
  }
}
