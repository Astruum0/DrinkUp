import { ApiProperty } from '@nestjs/swagger';

export class CreateCocktailDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  picture: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'Object',
      properties: {
        ingredient: {
          type: 'string',
        },
        quantity: {
          type: 'string',
        },
      },
    },
  })
  cocktailIngredients: [{ ingredient: string; quantity: string }];

  @ApiProperty()
  description: string;

  @ApiProperty()
  ratingsNb: number;

  @ApiProperty()
  rating: number;
}
