import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LoginDto{
  @ApiProperty()
  @IsNumber()
  documentType: number;

  @ApiProperty()
  @IsString()
  identification: string;

  @IsString()
  @ApiProperty()
  password: string;
}
