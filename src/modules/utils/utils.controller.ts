import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UtilsService } from './utils.service';
import { CreateRoleDto } from './dtos/create-role.dto';

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
  @Post('roles')
  createRole(@Body() body: CreateRoleDto) {
    return this.utilsService.createRole(body);
  }
}
