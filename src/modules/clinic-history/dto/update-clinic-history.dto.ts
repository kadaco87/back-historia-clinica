import { PartialType } from '@nestjs/swagger';
import { CreateVitalSignsDto } from './create-vital-signs.dto';

export class UpdateClinicHistoryDto extends PartialType(CreateVitalSignsDto) {}
