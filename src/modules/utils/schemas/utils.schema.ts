import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';
import { Document, Model } from 'mongoose';

export type RoleDocument = Role & Document;
@Schema()
export class Role extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ unique: true, type: String })
  role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

export type GenderDocument = Gender & Document;
@Schema()
export class Gender extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ unique: true, type: String })
  gender: string;
}

export const GenderSchema = SchemaFactory.createForClass(Gender);

export type DocumentTypeDocument = DocumentType & Document;
@Schema()
export class DocumentType extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ unique: true, type: String })
  documentType: string;
}

export const DocumentTypeSchema = SchemaFactory.createForClass(DocumentType);

export type RHDocument = RH & Document;
@Schema()
export class RH extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ unique: true, type: String })
  rh: string;
}

export const RHSchema = SchemaFactory.createForClass(RH);
