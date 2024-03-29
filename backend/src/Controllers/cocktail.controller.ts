import { CocktailIngredient } from 'src/Types/cocktailIngredient';
import { randomUUID } from 'crypto';
import { Cocktail } from '../Schemas/cocktail.schema';
import { CreateCocktailDto } from './../Dto/create-cocktail.dto';
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Patch,
} from '@nestjs/common';
import { CocktailsService } from 'src/Services/cocktail.service';
import { IngredientsService } from 'src/Services/ingredient.service';
import { Ingredient } from 'src/Schemas/ingredient.schema';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ingredientsListDto } from 'src/Dto/ingredients-list.dto';
import { UpdateCocktailDto } from 'src/Dto/update-cocktail.dto';

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
  @ApiBody({
    required: true,
    type: CreateCocktailDto,
  })
  async create(@Body() createCocktailDto: CreateCocktailDto) {
    const allQueries: Promise<Ingredient>[] = [];
    const recipe: CocktailIngredient[] = [];

    createCocktailDto.cocktailIngredients.forEach((ingredient) => {
      allQueries.push(this.ingredientService.findOne(ingredient.ingredient));
    });

    const queryResults = await Promise.all(allQueries);
    for (let i = 0; i < createCocktailDto.cocktailIngredients.length; i++) {
      let ingredient = queryResults[i];
      if (!ingredient) {
        ingredient = await this.ingredientService.newIngredient(
          createCocktailDto.cocktailIngredients[i].ingredient,
        );
      }
      const quantity = createCocktailDto.cocktailIngredients[i].quantity;
      recipe.push({ ingredient, quantity });
    }

    const cocktailID = randomUUID();
    const cocktail: Cocktail = {
      id: cocktailID,
      name: createCocktailDto.name,
      picture: createCocktailDto.picture ? cocktailID : 'cocktail-template',
      ingredients: recipe,
      description: createCocktailDto.description,
      ratingsNb: 0,
      rating: 0,
      isApproved: false,
    };

    try {
      return this.cocktailService.create(cocktail);
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
  }

  @Post('/search')
  @ApiResponse({
    status: 200,
    description:
      'Return two lists of cocktails that can be made from the list of ingredients supplied',
    type: CreateCocktailDto,
  })
  async create_cocktail(@Body() ingredientsList: ingredientsListDto) {
    return this.cocktailService.findDoableCocktails(ingredientsList);
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

  @Get('/trending')
  @ApiResponse({
    status: 200,
    description: 'Returns all the cocktails sorted by popularity',
    type: [Cocktail],
  })
  async trending() {
    return (await this.cocktailService.findAll()).sort(
      (c1, c2) => c2.rating / c2.ratingsNb - c1.rating / c1.ratingsNb,
    );
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
    return this.cocktailService.delete(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Modifies given fields of given cocktail.',
    type: Cocktail,
  })
  updateCocktail(@Param('id') id: string, @Body() post: UpdateCocktailDto) {
    return this.cocktailService.updateCocktail(id, post);
  }
}
