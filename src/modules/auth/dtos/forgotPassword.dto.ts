import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsNumber()
  documentType: number;

  @ApiProperty()
  @IsString()
  identification: string;
}
