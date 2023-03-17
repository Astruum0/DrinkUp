import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CocktailIngredient } from 'src/Types/cocktailIngredient';

export type CocktailDocument = HydratedDocument<Cocktail>;

@Schema()
export class Cocktail {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop()
  ingredients: CocktailIngredient[];

  @Prop()
  description: string;

  @Prop()
  ratingsNb: number;

  @Prop()
  rating: number;
}

export const CocktailSchema = SchemaFactory.createForClass(Cocktail);
