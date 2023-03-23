import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from 'src/schemas/ingredient.schema';

export class CocktailIngredient {
  @ApiProperty()
  ingredient: Ingredient;
  @ApiProperty()
  quantity: string;
}
