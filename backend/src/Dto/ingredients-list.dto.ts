import { ApiProperty } from '@nestjs/swagger';

export class ingredientsListDto {
  @ApiProperty()
  ingredients: string[];
}
