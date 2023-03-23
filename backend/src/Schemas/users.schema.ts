import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  profile_pic: string;

  @Prop()
  password: string;

  @Prop()
  admin_role: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);