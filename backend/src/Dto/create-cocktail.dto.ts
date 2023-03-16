import { Ingredients } from 'src/Types/ingredients';

export class CreateCocktailDto {
  id: string;
  name: string;
  picture: string;
  ingredients: Ingredients[];
  description: string;
  ratingsNb: number;
  rating: number;
}
