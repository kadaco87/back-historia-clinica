import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UtilsService } from './utils.service';

@Controller('utils')
@ApiTags('Utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get('countries')
  coutries() {
    return this.utilsService.getCountries();
  }
}
