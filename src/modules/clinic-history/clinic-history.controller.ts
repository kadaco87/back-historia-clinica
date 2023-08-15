import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { CreateVitalSignsDto } from './dto/create-vital-signs.dto';
import { UpdateClinicHistoryDto } from './dto/update-clinic-history.dto';
import {
  CreateNotaAclaratoriaDto,
  CreateNotaEnfermeriaDto,
} from './dto/create-nota-enfermeria.dto';
import { CreateOrdenMedicaDto } from './dto/create-orden-medica.dto';

@Controller('clinic-history')
export class ClinicHistoryController {
  constructor(private readonly clinicHistoryService: ClinicHistoryService) {}

  @Post('vital-signs/:patientId')
  createVitalSign(
    @Param('patientId') patientId: string,
    @Body() createVitalSignDto: CreateVitalSignsDto,
  ) {
    return this.clinicHistoryService.createVitalSign(
      patientId,
      createVitalSignDto,
    );
  }

  @Get('vital-signs/:patientId')
  findVitalSignsForPatientID(@Param('patientId') patientId: string) {
    return this.clinicHistoryService.findVitalSignsForPatientId(patientId);
  }

  @Post('notas-enfermeria/:notaId/notas-aclaratorias')
  createNotaAclaratoria(
    @Param('notaId') notaId: string,
    @Body() createNotaAclaratoriaDto: CreateNotaAclaratoriaDto,
  ) {
    return this.clinicHistoryService.createNotaAclaratoria(
      notaId,
      createNotaAclaratoriaDto,
    );
  }

  @Post('notas-enfermeria/:patientId')
  createNotaEnfermeria(
    @Param('patientId') patientId: string,
    @Body() createNotaEnfermeriaDto: CreateNotaEnfermeriaDto,
  ) {
    return this.clinicHistoryService.createNotaEnfemeria(
      patientId,
      createNotaEnfermeriaDto,
    );
  }

  @Get('notas-enfermeria/:patientId')
  findNotaEnfermeriaForPatientID(@Param('patientId') patientId: string) {
    return this.clinicHistoryService.findNotasEnfermeriaForPatientId(patientId);
  }

  @Post('ordenes-medicas/:patientId')
  createOrdenMedica(
    @Param('patientId') patientId: string,
    @Body() createOrdenMedicaDto: CreateOrdenMedicaDto,
  ) {
    return this.clinicHistoryService.createOrdenMedica(
      patientId,
      createOrdenMedicaDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClinicHistoryDto: UpdateClinicHistoryDto,
  ) {
    return this.clinicHistoryService.update(+id, updateClinicHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicHistoryService.remove(+id);
  }
}
