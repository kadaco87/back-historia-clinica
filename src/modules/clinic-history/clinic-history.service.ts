import { HttpException, Injectable } from '@nestjs/common';
import { CreateVitalSignsDto } from './dto/create-vital-signs.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  AtencionMedica,
  HistoriaClinica,
  NotasEnfemeria,
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
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';

interface ModelExt<T> extends Model<T> {
  delete: (id) => any;
  findDeleted: () => any;
  restore: (id) => any;
}

@Injectable()
export class ClinicHistoryService {
  constructor(
    @InjectModel(HistoriaClinica.name)
    private historiaClinicaModel: ModelExt<HistoriaClinica>,
    @InjectModel(VitalSigns.name) private vitalSignsModel: ModelExt<VitalSigns>,
    @InjectModel(NotasEnfemeria.name)
    private notaEnfemeriaModel: ModelExt<NotasEnfemeria>,
    @InjectModel(OrdenMedica.name)
    private ordenMedicaModel: ModelExt<OrdenMedica>,
    @InjectModel(AtencionMedica.name)
    private atencionMedicaModel: ModelExt<AtencionMedica>,
  ) {}
  async createVitalSign(
    historyId: string,
    patientId: string,
    createVitalSignDto: CreateVitalSignsDto,
  ) {
    try {
      const vitalSigns = new this.vitalSignsModel({
        historyId,
        patientId,
        ...createVitalSignDto,
      });
      return !!(await vitalSigns.save());
    } catch (e) {
      console.error('Este es el error al crear el vitalSigns => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async createNotaEnfemeria(
    historyId: string,
    patientId: string,
    createNotaEnfermeriaDto: CreateNotaEnfermeriaDto,
  ) {
    try {
      const notaEnfemeria = new this.notaEnfemeriaModel({
        historyId,
        patientId,
        ...createNotaEnfermeriaDto,
      });
      return await notaEnfemeria.save();
    } catch (e) {
      console.error('Este es el error al crear el notaEnfemeria => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async createAtencionMedica(
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
    historyId: string,
    patientId: string,
    createOrdenMedicaDto: CreateOrdenMedicaDto,
  ) {
    try {
      const ordenMedica = new this.ordenMedicaModel({
        historyId,
        patientId,
        ...createOrdenMedicaDto,
      });
      return await ordenMedica.save();
    } catch (e) {
      console.error('Este es el error al crear el OrdenMedicaDto => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async findMedicalOrdersForHistoryId(historyId: string) {
    return await this.ordenMedicaModel
      .find({ historyId })
      .select({
        __v: false,
        _id: false,
        deleted: false,
      })
      .exec();
  }

  async findVitalSignsForPatientId(historyId: string) {
    return await this.vitalSignsModel
      .find({ historyId })
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

  async findAllActiveHistories() {
    return await this.historiaClinicaModel
      .find({ state: true })
      .select({
        __v: false,
        _id: false,
        deleted: false,
      })
      .exec();
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

  async createHistoriaClinica(params: CreateHistoriaClinicaDto) {
    try {
      const historiaClinica = new this.historiaClinicaModel({
        ...params,
        state: true,
      });
      return !!(await historiaClinica.save());
    } catch (e) {
      console.error('Este es el error al crear el Historia Clinica => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async createAtencionMedicaModel(
    historyId: string,
    patientId: string,
    body: CreateHistoriaClinicaDto,
  ) {
    try {
      const atencionMedica = new this.atencionMedicaModel({
        historyId,
        patientId,
        ...body,
      });
      return !!(await atencionMedica.save());
    } catch (e) {
      console.error('Este es el error al crear el Atencion Medica => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }
}
