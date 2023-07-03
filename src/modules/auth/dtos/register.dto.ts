import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

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
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  birthday: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
