import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UtilsService } from './utils.service';

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
}
