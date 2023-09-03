import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { CreateVitalSignsDto } from './dto/create-vital-signs.dto';
import {
  CreateNotaAclaratoriaDto,
  CreateNotaEnfermeriaDto,
} from './dto/create-nota-enfermeria.dto';
import { CreateOrdenMedicaDto } from './dto/create-orden-medica.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateAntecedentesClinicos } from './dto/create-antecentes-clinicos.dto';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';

@Controller('clinic-history')
@ApiTags('Clinic History')
export class ClinicHistoryController {
  constructor(private readonly clinicHistoryService: ClinicHistoryService) {}

  @Get(':patientId')
  findAllHistoriasClinicasForPatientID(@Param('patientId') patientId: string) {
    return this.clinicHistoryService.findAllHistoriasClinicasForPatientID(
      patientId,
    );
  }
  @Patch()
  cerrarHistoriaClinica(@Body() historyId: Partial<CreateHistoriaClinicaDto>) {
    return this.clinicHistoryService.cerrarHistoriaClinica(historyId);
  }
  @Post('historia-clinica/:historyId/:patientId')
  createHistoriaClinica(
    @Param('historyId') historyId: string,
    @Param('patientId') patientId: string,
  ) {
    return this.clinicHistoryService.createHistoriaClinica({
      historyId,
      patientId,
    });
  }

  @Post('vital-signs/:historyId/:patientId')
  createVitalSign(
    @Param('historyId') historyId: string,
    @Param('patientId') patientId: string,
    @Body() createVitalSignDto: CreateVitalSignsDto,
  ) {
    return this.clinicHistoryService.createVitalSign(
      historyId,
      patientId,
      createVitalSignDto,
    );
  }

  @Get('vital-signs/:historyId')
  findVitalSignsForPatientID(@Param('historyId') historyId: string) {
    return this.clinicHistoryService.findVitalSignsForPatientId(historyId);
  }

  @Get('ordenes-medicas/:historyId')
  findMedicalOrdersForHistoryId(@Param('historyId') historyId: string) {
    return this.clinicHistoryService.findMedicalOrdersForHistoryId(historyId);
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

  @Post('notas-enfermeria/:historyId/:patientId')
  createNotaEnfermeria(
    @Param('historyId') historyId: string,
    @Param('patientId') patientId: string,
    @Body() createNotaEnfermeriaDto: CreateNotaEnfermeriaDto,
  ) {
    return this.clinicHistoryService.createNotaEnfemeria(
      historyId,
      patientId,
      createNotaEnfermeriaDto,
    );
  }

  @Get('notas-enfermeria/:patientId')
  findNotaEnfermeriaForPatientID(@Param('patientId') patientId: string) {
    return this.clinicHistoryService.findNotasEnfermeriaForPatientId(patientId);
  }

  @Post('ordenes-medicas/:historyId/:patientId')
  createOrdenMedica(
    @Param('historyId') historyId: string,
    @Param('patientId') patientId: string,
    @Body() createOrdenMedicaDto: CreateOrdenMedicaDto,
  ) {
    return this.clinicHistoryService.createOrdenMedica(
      historyId,
      patientId,
      createOrdenMedicaDto,
    );
  }

  @Post('atenciones-medicas/:historyId/:patientId')
  createAtencionMedica(
    @Param('historyId') historyId: string,
    @Param('patientId') patientId: string,
    @Body() body: any,
  ) {
    return this.clinicHistoryService.createAtencionMedicaModel(
      historyId,
      patientId,
      body,
    );
  }

  @Post('antecedentes-clinicos/:historyId/:patientId')
  createAntecedentesClinicos(
    @Param('historyId') historyId: string,
    @Param('patientId') patientId: string,
    @Body() body: CreateAntecedentesClinicos,
  ) {
    this.clinicHistoryService.createAntecedentesClinicos(
      historyId,
      patientId,
      body,
    );
  }
}
