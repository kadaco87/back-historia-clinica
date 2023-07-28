import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gender: string;
}
