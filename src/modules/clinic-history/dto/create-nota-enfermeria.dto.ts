import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotaAclaratoriaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notaAclaratoria: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  date: number;
}

export class CreateNotaEnfermeriaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nota: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  date: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  temporalidad: number;

  @ApiProperty()
  @IsArray()
  notasAclaratorias: [];
}
