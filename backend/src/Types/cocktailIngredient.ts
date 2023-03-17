import { Ingredient } from 'src/schemas/ingredient.schema';

export type CocktailIngredient = {
  ingredient: Ingredient;
  quantity: string;
};
