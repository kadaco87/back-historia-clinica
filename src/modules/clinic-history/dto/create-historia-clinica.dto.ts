import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHistoriaClinicaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  historyId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  patientId: string;
}
