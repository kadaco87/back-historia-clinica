import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';
import { Document, Model } from 'mongoose';
import { hashSync } from 'bcrypt';

export type UserDocument = User & Document;
@Schema()
export class UserFullName extends Model {
  @Prop({ required: true, type: String })
  firstName: string;
  @Prop({ required: false, type: String })
  secondName: string;
  @Prop({ required: true, type: String })
  firstLastName: string;
  @Prop({ required: false, type: String })
  secondLastName: string;
}

@Schema()
export class UserContactInfo extends Model {
  @Prop({ required: true, type: String })
  address: string;
  @Prop({ required: true, type: String })
  city: string;
  @Prop({ required: true, type: String })
  countryOfResidence: string;
  @Prop({ required: true, type: Number })
  phone: number;
  @Prop({ required: true, type: String })
  state: string;
  @Prop({ required: true, type: String })
  zipCode: string;
  @Prop({ required: true, type: String })
  email: string;
}

@Schema({ timestamps: true })
export class User extends Model {
  @Prop({ unique: true, default: uuidV4 })
  id: string;

  @Prop({ required: true, unique: true, type: String })
  identification: string;

  @Prop({ required: true, type: UserFullName })
  fullName: UserFullName;

  @Prop({ required: true, type: UserContactInfo })
  contactInfo: UserContactInfo;

  @Prop({ type: String, default: hashSync('user1234', 10) })
  password: string;

  @Prop({ required: true, type: String })
  role: string;

  @Prop({ required: true, type: String })
  documentType: string;

  @Prop({ required: true, type: String })
  birthday: string;

  @Prop({ required: true, type: String })
  gender: string;

  @Prop({
    unique: true,
    sparse: true,
    type: String,
  })
  resetPasswordToken: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
