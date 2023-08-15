import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UtilsService } from './utils.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { CreateGenderDto } from './dtos/create-gender.dto';
import { CreateDocumentTypeDto } from './dtos/create-document-type.dto';
import { CreateRHDto } from './dtos/create-rh.dto';

@Controller('utils')
@ApiTags('Utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get('countries')
  getCountries() {
    return this.utilsService.getCountries();
  }

  @Get('genders')
  getGenderList() {
    return this.utilsService.getGenderList();
  }

  @Get('document-types')
  getDocumentTypes() {
    return this.utilsService.getDocumentTypes();
  }
  @Get('roles')
  getRoles() {
    return this.utilsService.getRoles();
  }

  @Get('rh')
  getRH() {
    return this.utilsService.getRH();
  }
  @Post('roles')
  createRole(@Body() body: CreateRoleDto) {
    return this.utilsService.createRole(body);
  }

  @Post('genders')
  createGender(@Body() body: CreateGenderDto) {
    return this.utilsService.createGender(body);
  }

  @Post('document-types')
  createDocumentTypes(@Body() body: CreateDocumentTypeDto) {
    return this.utilsService.createDocumentType(body);
  }

  @Post('rh')
  createRH(@Body() body: CreateRHDto) {
    return this.utilsService.createRH(body);
  }
}
