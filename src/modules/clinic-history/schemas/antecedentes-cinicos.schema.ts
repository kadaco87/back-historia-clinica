import { Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class TiposTixicologicos extends Model {
  @Prop({ type: Boolean })
  tabaquismo: boolean;
  @Prop({ type: Boolean })
  alcoholismo: boolean;
  @Prop({ type: Boolean })
  otros: boolean;
}
export class Toxicologicos extends Model {
  @Prop({ required: true, type: TiposTixicologicos })
  tipo: TiposTixicologicos;
  @Prop({ type: String })
  observaciones: string;
}

export class TiposPatologicos extends Model {
  @Prop({ type: Boolean })
  hipertensionArterial: boolean;
  @Prop({ type: Boolean })
  diabetesMellitus: boolean;
  @Prop({ type: Boolean })
  hepatitisB: boolean;
  @Prop({ type: Boolean })
  hepatitisC: boolean;
  @Prop({ type: Boolean })
  vih: boolean;
  @Prop({ type: Boolean })
  serologia: boolean;
  @Prop({ type: Boolean })
  epoc: boolean;
  @Prop({ type: Boolean })
  enfermedadCoronaria: boolean;
  @Prop({ type: Boolean })
  dislipidemia: boolean;
  @Prop({ type: Boolean })
  cancer: boolean;
}
export class Patologicos extends Model {
  @Prop({ required: true, type: TiposPatologicos })
  tipo: TiposPatologicos;
  @Prop({ type: String })
  observaciones: string;
}

export class TiposQuirurgicos extends Model {
  @Prop({ type: Boolean })
  nefrectomia: boolean;
  @Prop({ type: Boolean })
  cirugiaAbdominal: boolean;
  @Prop({ type: Boolean })
  apendicectomia: boolean;
  @Prop({ type: Boolean })
  herniorrafia: boolean;
  @Prop({ type: Boolean })
  laparotomia: boolean;
  @Prop({ type: Boolean })
  histeroctomia: boolean;
  @Prop({ type: Boolean })
  osteosintesis: boolean;
}
export class Quirurgicos extends Model {
  @Prop({ required: true, type: TiposQuirurgicos })
  tipo: TiposQuirurgicos;
  @Prop({ type: String })
  observaciones: string;
}

export class TiposAlergicos extends Model {
  @Prop({ type: Boolean })
  penicilinas: boolean;
  @Prop({ type: Boolean })
  sulfas: boolean;
  @Prop({ type: Boolean })
  dipirona: boolean;
  @Prop({ type: Boolean })
  iecas: boolean;
}
export class Alergicos extends Model {
  @Prop({ required: true, type: TiposAlergicos })
  tipo: TiposAlergicos;
  @Prop({ type: String })
  observaciones: string;
}

export class Familiares extends Model {
  @Prop({ type: String })
  parentesco: string;
  @Prop({ type: Number })
  fechaDiagnostico: number;
  @Prop({ type: String })
  diagnostico: string;
}

export type AntecedentesClinicoDocument = AntecedentesClinico & Document;
@Schema()
export class AntecedentesClinico extends Model {
  @Prop({ type: String })
  historyId: string;
  @Prop({ type: String })
  patientId: string;
  @Prop({ required: true, type: Toxicologicos })
  toxicologico: Toxicologicos;
  @Prop({ required: true, type: Patologicos })
  patologico: Patologicos;
  @Prop({ required: true, type: Quirurgicos })
  quirurgicos: Quirurgicos;
  @Prop({ required: true, type: Alergicos })
  alergicos: Alergicos;
  @Prop({ type: [] })
  familiares: Familiares[];
}

export const AntecedentesClinicoSchema =
  SchemaFactory.createForClass(AntecedentesClinico);
