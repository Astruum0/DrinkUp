import { ApiProperty } from '@nestjs/swagger';

export class CreateCocktailDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  picture: string;

  @ApiProperty({
    isArray: true,
    type: '{ ingredient: string; quantity: string }',
  })
  cocktailIngredients: [{ ingredient: string; quantity: string }];

  @ApiProperty()
  description: string;

  @ApiProperty()
  ratingsNb: number;

  @ApiProperty()
  rating: number;
}
