import { Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';

export type HistoriaClinicaDocument = HistoriaClinica & Document;

@Schema()
export class HistoriaClinica extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ type: String })
  patientId: string;

  @Prop({ type: String })
  historyId: string;

  @Prop({ type: Boolean })
  state: boolean;
}

export const HistoriaClinicaSchema =
  SchemaFactory.createForClass(HistoriaClinica);

export type VitalSignsDocument = VitalSigns & Document;

@Schema()
export class VitalSigns extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ type: String })
  patientId: string;

  @Prop({ type: String })
  historyId: string;

  @Prop({ type: Number })
  date: number;

  @Prop({ type: Number })
  frecuenciaCardiaca: number;

  @Prop({ type: Number })
  frecuenciaRespiratoria: number;

  @Prop({ type: Number })
  saturacion: number;

  @Prop({ type: Number })
  sistolica: number;

  @Prop({ type: Number })
  diastolica: number;

  @Prop({ type: Number })
  pam: number;

  @Prop({ type: Number })
  temperatura: number;

  @Prop({ type: Number })
  glasgow: number;

  @Prop({ type: Number })
  estatura: number;

  @Prop({ type: Number })
  peso: number;

  @Prop({ type: Number })
  imc: number;

  @Prop({ type: String })
  rh: string;
}

export const VitalSignsSchema = SchemaFactory.createForClass(VitalSigns);

@Schema()
export class NotaAclaratoria extends Model {
  @Prop({ type: String })
  notaAclaratoria: string;

  @Prop({ type: Number })
  date: number;
}

export type NotasEnfemeriaDocument = NotasEnfemeria & Document;

@Schema()
export class NotasEnfemeria extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ type: String })
  patientId: string;

  @Prop({ type: String })
  historyId: string;

  @Prop({ type: String })
  nota: string;

  @Prop({ type: Number })
  temporalidad: number;

  @Prop({ type: Number })
  date: number;

  @Prop({ type: [] })
  notasAclaratorias: NotaAclaratoria[];
}

export const NotasEnfemeriaSchema =
  SchemaFactory.createForClass(NotasEnfemeria);

@Schema()
export class Medicamento extends Model {
  @Prop({ type: String })
  categoriaMedicamento: string;

  @Prop({ type: String })
  medicamento: string;

  @Prop({ type: Number })
  viaAdmon: number;

  @Prop({ type: Number })
  dosis: number;

  @Prop({ type: String })
  presentacion: string;

  @Prop({ type: Number })
  frecuencia: number;

  @Prop({ type: String })
  horario: string;

  @Prop({ type: Number })
  duracion: number;

  @Prop({ type: String })
  tiempo: string;
}

export type OrdenMedicaDocument = OrdenMedica & Document;

@Schema()
export class OrdenMedica extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ type: String })
  patientId: string;

  @Prop({ type: String })
  historyId: string;

  @Prop({ type: String })
  planManejo: string;

  @Prop({ type: Number })
  temporalidad: number;

  @Prop({ type: Number })
  date: number;

  @Prop({ type: [] })
  medicamentos: Medicamento[];
}

export const OrdenMedicaSchema = SchemaFactory.createForClass(OrdenMedica);

export class Diagnostico extends Model {
  @Prop({ type: Number })
  causaExterna: number;
  @Prop({ type: String })
  cie10: string;
  @Prop({ type: Date })
  fechaRegistro: Date;
  @Prop({ type: Number })
  clasificacionDiagnostico: number;
  @Prop({ type: Number })
  tipoDiagnostico: number;
}

export type AtencionMedicaDocument = AtencionMedica & Document;
@Schema()
export class AtencionMedica extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ type: String })
  patientId: string;

  @Prop({ type: String })
  historyId: string;

  @Prop({ type: Number })
  date: number;

  @Prop({ type: String })
  modalidad: string;

  @Prop({ type: String })
  tipoConsulta: string;

  @Prop({ type: String })
  nombreConsulta: string;

  @Prop({ type: Number })
  consecutivoConsulta: number;

  @Prop({ type: String })
  enfermedadActual: string;

  @Prop({ type: String })
  articular: string;

  @Prop({ type: String })
  cardiaco: string;

  @Prop({ type: String })
  muscular: string;

  @Prop({ type: String })
  linfatico: string;

  @Prop({ type: String })
  digestivo: string;

  @Prop({ type: String })
  reproductor: string;

  @Prop({ type: String })
  endocrino: string;

  @Prop({ type: String })
  urinario: string;

  @Prop({ type: String })
  respiratorio: string;

  @Prop({ type: String })
  nervioso: string;

  @Prop({ type: String })
  inmunitario: string;

  @Prop({ type: String })
  tegumentario: string;

  @Prop({ type: String })
  examenFisico: string;

  @Prop({ type: [] })
  diagnosticos: Diagnostico[];
}

export const AtencionMedicaSchema =
  SchemaFactory.createForClass(AtencionMedica);
