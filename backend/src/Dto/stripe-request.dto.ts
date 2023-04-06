import { ApiProperty } from '@nestjs/swagger';

export class StripeRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  qty: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  base_price: number;
}
