import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  documentType: string;

  @ApiProperty()
  @IsString()
  identification: string;

  @IsString()
  @ApiProperty()
  password: string;
}
