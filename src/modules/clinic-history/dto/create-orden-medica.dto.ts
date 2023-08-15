import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MedicamentoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoriaMedicamento: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  medicamento: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  viaAdmon: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  dosis: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  presentacion: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  frecuencia: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  horario: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duracion: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tiempo: string;
}

export class CreateOrdenMedicaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tipoAtencion: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  planManejo: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  date: number;

  @ApiProperty()
  @IsArray()
  medicamentos: MedicamentoDto[];
}
