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
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  userList = [];

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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
    if (user && (await compare(user.password, oldPassword))) {
      // TODO: modificar en BD
      this.userList[index].password = body.password;
      return true;
    }
    return false;
  }

  changePassword(body) {
    // TODO: crear logica que va a permitir cambiar la contraseña desde el perfil del usuario
    return body;
  }

  getProfile(req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const userId = this.jwtService.decode(token, { json: true })['userId'];
    const user = this.usersService.findOne(userId);
    if (user) return user;
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
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

  async validateUser(identification: string, password: string) {
    const user = (
      await this.usersService.findOneByIdentification(identification)
    ).toObject();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword =
      (await compare(password, user.password)) || password === user.password;

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(body: LoginDto) {
    const access_token = await this.generateAccessToken(
      body.identification,
      body.password,
    );
    const refresh_token = await this.generateRefreshToken(body.identification);

    if (access_token && refresh_token) return { access_token, refresh_token };
  }

  async generateAccessToken(
    identification: string,
    password: string,
  ): Promise<string> {
    try {
      const user = await this.validateUser(identification, password);
      if (
        user &&
        ((await compare(password, user.password)) || password === user.password)
      ) {
        const payload: JwtPayload = { userId: user.id };
        return await this.jwtService.signAsync(payload);
      }
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload: JwtPayload = { userId };
    return this.jwtService.signAsync(payload, {
      expiresIn: '1800s', // tiempo de expiración del refresh token 1800s = 30min
    });
  }

  async validateRefreshToken(refreshToken: string): Promise<boolean> {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refreshToken,
        { secret: Configuration().jwtSecretKey },
      );
      const user = await this.usersService.findOneByIdentification(
        payload.userId,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async refreshToken(req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const userId = this.jwtService.decode(token, { json: true })['userId'];
    const user = (
      await this.usersService.findOneByIdentification(userId)
    ).toObject();
    const access_token = await this.generateAccessToken(
      user.identification,
      user.password,
    );
    const refresh_token = await this.generateRefreshToken(userId);
    return { access_token, refresh_token };
  }
}
