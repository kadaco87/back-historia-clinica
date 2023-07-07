import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsObject, IsString } from 'class-validator';

export class FullName {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  secondName: string;
  @ApiProperty()
  @IsString()
  firstLastName: string;
  @ApiProperty()
  @IsString()
  secondLastName: string;
}

export class ContactInfo {
  @ApiProperty()
  @IsString()
  countryOfResidence: string;
  @ApiProperty()
  @IsString()
  zipCode: string;
  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsString()
  state: string;
  @ApiProperty()
  @IsString()
  city: string;
  @ApiProperty()
  @IsEmail()
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
