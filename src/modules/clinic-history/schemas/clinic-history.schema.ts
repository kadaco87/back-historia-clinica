import { Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';

export type VitalSignsDocument = VitalSigns & Document;
@Schema()
export class VitalSigns extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ type: String })
  patientId: string;

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

export type NotaEnfemeriaDocument = NotaEnfemeria & Document;
@Schema()
export class NotaEnfemeria extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ type: String })
  patientId: string;

  @Prop({ type: String })
  nota: string;

  @Prop({ type: Number })
  temporalidad: number;

  @Prop({ type: Number })
  date: number;

  @Prop({ type: [] })
  notasAclaratorias: NotaAclaratoria[];
}

export const NotaEnfemeriaSchema = SchemaFactory.createForClass(NotaEnfemeria);

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
  planManejo: string;

  @Prop({ type: Number })
  temporalidad: number;

  @Prop({ type: Number })
  date: number;

  @Prop({ type: [] })
  medicamentos: Medicamento[];
}

export const OrdenMedicaSchema = SchemaFactory.createForClass(OrdenMedica);
