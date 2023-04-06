import { ApiProperty } from '@nestjs/swagger';

export class UpdateCocktailDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  picture: boolean;

  @ApiProperty({
    isArray: true,
    type: '{ ingredient: string; quantity: string }',
  })
  cocktailIngredients: [{ ingredient: string; quantity: string }];

  @ApiProperty()
  description: string;

  @ApiProperty()
  rating: number;
}
