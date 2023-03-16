import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cocktail, CocktailSchema } from 'src/Schemas/cocktail.schema';
import { CocktailsService } from 'src/Services/cocktail.service';
import { CocktailsController } from '../Controllers/cocktail.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cocktail.name, schema: CocktailSchema },
    ]),
  ],
  controllers: [CocktailsController],
  providers: [CocktailsService],
})
export class CocktailsModule {}
