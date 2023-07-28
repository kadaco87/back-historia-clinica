import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Gender, GenderSchema, Role, RoleSchema } from './schemas/utils.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Gender.name, schema: GenderSchema },
    ]),
  ],
  providers: [UtilsService],
  controllers: [UtilsController],
})
export class UtilsModule {}
