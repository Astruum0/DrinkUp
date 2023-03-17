import { IngredientType } from 'src/Types/IngredientType';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  picture: string;

  @ApiProperty()
  keywords: string[];

  @ApiProperty()
  id: string;

  @ApiProperty()
  type: IngredientType;
}
