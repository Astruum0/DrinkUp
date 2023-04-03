import { IngredientsService } from 'src/Services/ingredient.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cocktail, CocktailSchema } from 'src/Schemas/cocktail.schema';
import { CocktailsService } from 'src/Services/cocktail.service';
import { CocktailsController } from '../Controllers/cocktail.controller';
import { Ingredient, IngredientSchema } from 'src/Schemas/ingredient.schema';
import { ImageService } from 'src/Services/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cocktail.name, schema: CocktailSchema },
    ]),
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [CocktailsController],
  providers: [CocktailsService, IngredientsService, ImageService],
})
export class CocktailsModule {}
