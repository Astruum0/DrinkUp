export class CreateCocktailDto {
  id: string;
  name: string;
  picture: string;
  cocktailIngredients: [{ ingredient: string; quantity: string }];
  description: string;
  ratingsNb: number;
  rating: number;
}
