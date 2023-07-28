import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';
import { Document, Model } from 'mongoose';

export type RoleDocument = Role & Document;
@Schema()
export class Role extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ type: String })
  role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
