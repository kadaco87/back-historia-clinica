import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  documentType: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  identification: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(24)
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  secondName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstLastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  secondLastname: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  birthday: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
