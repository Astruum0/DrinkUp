import { CocktailIngredient } from 'src/Types/cocktailIngredient';
import { randomUUID } from 'crypto';
import { Cocktail } from '../Schemas/cocktail.schema';
import { CreateCocktailDto } from './../Dto/create-cocktail.dto';
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { CocktailsService } from 'src/Services/cocktail.service';
import { IngredientsService } from 'src/Services/ingredient.service';
import { Ingredient } from 'src/Schemas/ingredient.schema';
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { ingredientsListDto } from 'src/Dto/ingredients-list.dto';

@ApiTags('Cocktails')
@Controller('cocktails')
export class CocktailsController {
  constructor(
    private readonly cocktailService: CocktailsService,
    private readonly ingredientService: IngredientsService,
  ) {}

  @Post('/create')
  @ApiCreatedResponse({
    status: 201,
    description: 'The cocktail has been successfully created.',
    type: CreateCocktailDto,
  })
  async create(@Body() createCocktailDto: CreateCocktailDto) {
    const allQueries: Promise<Ingredient>[] = [];
    const allIngredients: CocktailIngredient[] = [];

    createCocktailDto.cocktailIngredients.forEach((ingredient) => {
      allQueries.push(this.ingredientService.findOne(ingredient.ingredient));
    });

    Promise.all(allQueries).then((ingredientObject) => {
      createCocktailDto.cocktailIngredients.forEach((ingredient, i) => {
        allIngredients.push({
          ingredient: ingredientObject[i],
          quantity: ingredient.quantity,
        });
      }) as unknown as CocktailIngredient[];

      const cocktail: Cocktail = {
        id: randomUUID(),
        name: createCocktailDto.name,
        picture: createCocktailDto.picture,
        ingredients: allIngredients,
        description: createCocktailDto.description,
        ratingsNb: null,
        rating: null,
      };

      try {
        this.cocktailService.create(cocktail);
      } catch (e: unknown) {
        return {
          error:
            typeof e === 'string'
              ? e.toUpperCase()
              : e instanceof Error
              ? e.message
              : 'Error',
        };
      }
    });
  }

  @Post('/create-cocktail')
  @ApiCreatedResponse({
    status: 201,
    description:
      'Return two lists of cocktails that can be made from the list of ingredients supplied',
    type: CreateCocktailDto,
  })
  async create_cocktail(@Body() ingredientsList: ingredientsListDto) {
    this.cocktailService.findAll().then((data) => {
      const partially_doable = [];
      const doable = [];
      let ingredient_name: string;
      let percentage: number;
      for (let i = 0; i < data.length; i++) {
        const cocktail = data[i];
        let completion = 0;
        for (let j = 0; j < cocktail.ingredients.length; j++) {
          ingredient_name = cocktail.ingredients[j].ingredient.name;
          if (ingredientsList.ingredients.includes(ingredient_name)) {
            completion += 1;
          }
        }
        percentage = completion / cocktail.ingredients.length;
        if (percentage == 1) {
          doable.push(cocktail);
        } else if (percentage >= 0.5) {
          partially_doable.push(cocktail);
        }
      }
      console.log(doable, partially_doable);
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all the cocktails',
    type: [Cocktail],
  })
  findAll() {
    return this.cocktailService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the given cocktail',
    type: Cocktail,
  })
  findOne(@Param('id') id: string) {
    return this.cocktailService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deletes the given cocktail',
    type: String,
  })
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cocktail`;
  }
}
