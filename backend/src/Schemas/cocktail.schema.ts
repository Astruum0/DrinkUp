import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { CocktailIngredient } from 'src/Types/cocktailIngredient';

export type CocktailDocument = HydratedDocument<Cocktail>;

@Schema()
export class Cocktail {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  picture: string;

  @Prop()
  @ApiProperty({
    isArray: true,
    type: CocktailIngredient,
  })
  ingredients: CocktailIngredient[];

  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty()
  ratingsNb: number;

  @Prop()
  @ApiProperty()
  rating: number;

  @Prop()
  @ApiProperty()
  isApproved: boolean;
}

export const CocktailSchema = SchemaFactory.createForClass(Cocktail);
