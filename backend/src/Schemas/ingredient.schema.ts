import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IngredientType } from 'src/Types/IngredientType';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop([String])
  keywords: string[];

  @Prop()
  id: string;

  @Prop()
  type: IngredientType;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
