import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocumentType,
  DocumentTypeSchema,
  Gender,
  GenderSchema,
  RH,
  RHSchema,
  Role,
  RoleSchema,
} from './schemas/utils.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: RH.name, schema: RHSchema },
      { name: Gender.name, schema: GenderSchema },
      { name: DocumentType.name, schema: DocumentTypeSchema },
    ]),
  ],
  providers: [UtilsService],
  controllers: [UtilsController],
})
export class UtilsModule {}
