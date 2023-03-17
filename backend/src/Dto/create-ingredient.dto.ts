import { IngredientType } from 'src/Types/IngredientType';

export class CreateIngredientDto {
  name: string;
  picture: string;
  keywords: string[];
  id: string;
  type: IngredientType;
}
