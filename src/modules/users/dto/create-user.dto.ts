import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class FullName {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty()
  @IsString()
  secondName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstLastName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  secondLastName: string;
}

export class ContactInfo {
  @ApiProperty()
  @IsString()
  countryOfResidence: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zipCode: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreateUserDto {
  @ApiProperty({ type: () => FullName })
  @IsObject()
  fullName: FullName;
  @ApiProperty()
  @IsNumber()
  documentType: number;
  @ApiProperty()
  @IsString()
  identification: string;
  @ApiProperty()
  @IsString()
  birthday: string;
  @ApiProperty()
  @IsString()
  gender: string;
  @ApiProperty({ type: () => ContactInfo })
  @IsObject()
  contactInfo: ContactInfo;
  @ApiProperty()
  @IsString()
  role: string;
}
