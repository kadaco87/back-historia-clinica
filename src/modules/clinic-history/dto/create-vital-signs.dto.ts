import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVitalSignsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  frecuenciaCardiaca: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  date: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  frecuenciaRespiratoria: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  saturacion: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sistolica: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  diastolica: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pam: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  temperatura: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  glasgow: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  estatura: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  peso: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  imc: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rh: string;
}
