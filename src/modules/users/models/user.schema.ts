import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Document, Model } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User extends Model {
  @Prop({ unique: true, default: uuidv4 })
  id: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastname: string;
  @Prop()
  password: string;
  @Prop({ default: 'user' })
  roles: string[];
  @Prop()
  agree: string;
  @Prop()
  description: string;
  @Prop()
  status: string;
  @Prop({
    unique: true,
    sparse: true,
  })
  resetPasswordToken: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
