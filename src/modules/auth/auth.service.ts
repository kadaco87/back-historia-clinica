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
import { EventEmitter2 } from '@nestjs/event-emitter';
import Configuration from '../../configurations/configuration';

@Injectable()
export class AuthService {
  userList = [];

  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async login(body: LoginDto) {
    console.log({ body });
    // TODO: crear logica que va a permitir autenticar al usuario en el sistema
    const index = this.getUserIndex(body.identification);
    const user = this.userList[index];
    console.log({ user });
    if (user.password !== body.password) throw new UnauthorizedException();

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

  async forgotPassword(body: ForgotPasswordDto) {
    // TODO: crear logica que va a permitir iniciar el proceso de recuperacion de password de un usuario
    const index = this.getUserIndex(body.identification);
    const user = this.userList[index];
    if (user) {
      // TODO: Enviar email de recuperacion de contraseña
      const payload = { userId: user.id, oldPassword: user.password };
      const token = await this.jwtService.signAsync(payload);
      console.log(`forgotPassword(${JSON.stringify(body)})`);
      const data = { user, token };
      this.eventEmitter.emit('email.reset', data);
      return true;
    }
  }

  async resetPassword(body) {
    // TODO: crear logica que va a permitir cambiar la contraseña del usuario desde enlace en email de recuperar contraseña
    await this.jwtService.verifyAsync(body.token, {
      secret: Configuration().jwtSecretKey,
    });
    const userId = this.jwtService.decode(body.token)['userId'];
    const oldPassword = this.jwtService.decode(body.token)['oldPassword'];
    const index = this.userList.findIndex((user) => user.id === userId);
    const user = this.userList[index];
    if (user && user.password === oldPassword) {
      // TODO: modificar en BD
      console.log('user antes', this.userList[index]);
      this.userList[index].password = body.password;
      console.log('user despues', this.userList[index]);
      return true;
    }
    return false;
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
