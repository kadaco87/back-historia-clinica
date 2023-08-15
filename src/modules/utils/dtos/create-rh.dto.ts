import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRHDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  rh: string;
}
