import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { IngredientType } from 'src/Types/IngredientType';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  picture: string;

  @Prop([String])
  @ApiProperty()
  keywords: string[];

  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  type: IngredientType;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
