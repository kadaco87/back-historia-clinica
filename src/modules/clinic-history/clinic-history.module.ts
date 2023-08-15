import { Module } from '@nestjs/common';
import { ClinicHistoryService } from './clinic-history.service';
import { ClinicHistoryController } from './clinic-history.controller';
import {
  NotaEnfemeria,
  NotaEnfemeriaSchema,
  OrdenMedica,
  OrdenMedicaSchema,
  VitalSigns,
  VitalSignsSchema,
} from './schemas/clinic-history.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VitalSigns.name, schema: VitalSignsSchema },
      { name: NotaEnfemeria.name, schema: NotaEnfemeriaSchema },
      { name: OrdenMedica.name, schema: OrdenMedicaSchema },
    ]),
  ],
  controllers: [ClinicHistoryController],
  providers: [ClinicHistoryService],
})
export class ClinicHistoryModule {}
