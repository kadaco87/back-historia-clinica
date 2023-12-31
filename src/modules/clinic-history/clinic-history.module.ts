import { Module } from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { ClinicHistoryController } from './clinic-history.controller';
import {
  AtencionMedica,
  AtencionMedicaSchema,
  HistoriaClinica,
  HistoriaClinicaSchema,
  NotasEnfemeria,
  NotasEnfemeriaSchema,
  OrdenMedica,
  OrdenMedicaSchema,
  VitalSigns,
  VitalSignsSchema,
} from './schemas/clinic-history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AntecedentesClinico,
  AntecedentesClinicoSchema,
} from './schemas/antecedentes-cinicos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HistoriaClinica.name, schema: HistoriaClinicaSchema },
      { name: VitalSigns.name, schema: VitalSignsSchema },
      { name: NotasEnfemeria.name, schema: NotasEnfemeriaSchema },
      { name: OrdenMedica.name, schema: OrdenMedicaSchema },
      { name: AtencionMedica.name, schema: AtencionMedicaSchema },
      { name: AntecedentesClinico.name, schema: AntecedentesClinicoSchema },
    ]),
  ],
  controllers: [ClinicHistoryController],
  providers: [ClinicHistoryService],
  exports: [ClinicHistoryService],
})
export class ClinicHistoryModule {}
