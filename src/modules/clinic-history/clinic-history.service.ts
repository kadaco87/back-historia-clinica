import { HttpException, Injectable } from '@nestjs/common';
import { CreateVitalSignsDto } from './dto/create-vital-signs.dto';
import { UpdateClinicHistoryDto } from './dto/update-clinic-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotaEnfemeria,
  OrdenMedica,
  VitalSigns,
} from './schemas/clinic-history.schema';
import { Model } from 'mongoose';
import { HttpStatusCode } from 'axios';
import {
  CreateNotaAclaratoriaDto,
  CreateNotaEnfermeriaDto,
} from './dto/create-nota-enfermeria.dto';
import { CreateOrdenMedicaDto } from './dto/create-orden-medica.dto';

interface ModelExt<T> extends Model<T> {
  delete: (id) => any;
  findDeleted: () => any;
  restore: (id) => any;
}

@Injectable()
export class ClinicHistoryService {
  constructor(
    @InjectModel(VitalSigns.name) private vitalSignsModel: ModelExt<VitalSigns>,
    @InjectModel(NotaEnfemeria.name)
    private notaEnfemeriaModel: ModelExt<NotaEnfemeria>,
    @InjectModel(OrdenMedica.name)
    private ordenMedicaModel: ModelExt<OrdenMedica>,
  ) {}
  async createVitalSign(
    patientId: string,
    createVitalSignDto: CreateVitalSignsDto,
  ) {
    try {
      const vitalSigns = new this.vitalSignsModel({
        patientId,
        ...createVitalSignDto,
      });
      return await vitalSigns.save();
    } catch (e) {
      console.error('Este es el error al crear el vitalSigns => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async createNotaEnfemeria(
    patientId: string,
    createNotaEnfermeriaDto: CreateNotaEnfermeriaDto,
  ) {
    try {
      const notaEnfemeria = new this.notaEnfemeriaModel({
        patientId,
        ...createNotaEnfermeriaDto,
      });
      return await notaEnfemeria.save();
    } catch (e) {
      console.error('Este es el error al crear el notaEnfemeria => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async createOrdenMedica(
    patientId: string,
    createOrdenMedicaDto: CreateOrdenMedicaDto,
  ) {
    try {
      const ordenMedica = new this.ordenMedicaModel({
        patientId,
        ...createOrdenMedicaDto,
      });
      return await ordenMedica.save();
    } catch (e) {
      console.error('Este es el error al crear el OrdenMedicaDto => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async findVitalSignsForPatientId(patientId: string) {
    return await this.vitalSignsModel
      .find({ patientId })
      .select({
        __v: false,
        _id: false,
        deleted: false,
      })
      .exec();
  }

  async findNotasEnfermeriaForPatientId(patientId: string) {
    return await this.notaEnfemeriaModel
      .find({ patientId })
      .select({
        __v: false,
        _id: false,
        deleted: false,
      })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicHistory`;
  }

  update(id: number, updateClinicHistoryDto: UpdateClinicHistoryDto) {
    return `This action updates a #${id} clinicHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicHistory`;
  }

  async createNotaAclaratoria(
    notaId: string,
    createNotaAclaratoriaDto: CreateNotaAclaratoriaDto,
  ) {
    try {
      return await this.notaEnfemeriaModel.findOneAndUpdate(
        {
          id: notaId,
        },
        {
          $push: { notasAclaratorias: createNotaAclaratoriaDto },
        },
        {
          new: true,
        },
      );
    } catch (e) {
      console.error('Este es el error al crear el notaEnfemeria => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }
}
