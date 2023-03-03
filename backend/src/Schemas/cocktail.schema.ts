import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Ingredients } from 'src/Types/ingredients';

export type CocktailDocument = HydratedDocument<Cocktail>;

@Schema()
export class Cocktail {
  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop()
  ingredients: Ingredients[];

  @Prop()
  description: string;

  @Prop()
  ratingsNb: number;

  @Prop()
  rating: number;
}

export const CocktailSchema = SchemaFactory.createForClass(Cocktail);
