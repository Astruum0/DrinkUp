import { CocktailIngredient } from 'src/Types/cocktailIngredient';
import { randomUUID } from 'crypto';
import { Cocktail } from './../Schemas/cocktail.schema';
import { CreateCocktailDto } from './../Dto/create-cocktail.dto';
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { CocktailsService } from 'src/Services/cocktail.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { IngredientsService } from 'src/Services/ingredient.service';
import { Ingredient } from 'src/Schemas/ingredient.schema';
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

const storage = {
  storage: diskStorage({
    destination: './uploads/cocktails',
    filename: (_, file, cb) => {
      const filename: string = path.parse(file.originalname).name
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`)
    }
  })
}

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
    const recipe: CocktailIngredient[] = [];

    createCocktailDto.cocktailIngredients.forEach((ingredient) => {
      allQueries.push(this.ingredientService.findOne(ingredient.ingredient));
    });

    const queryResults = await Promise.all(allQueries)
    for (let i = 0; i < createCocktailDto.cocktailIngredients.length; i++) {
      let ingredient = queryResults[i]
      if (!ingredient) {
        ingredient = await this.ingredientService.newIngredient(createCocktailDto.cocktailIngredients[i].ingredient) 
      }
      const quantity = createCocktailDto.cocktailIngredients[i].quantity
      recipe.push({ ingredient, quantity })
    }

    const cocktailID = randomUUID()
    const cocktail: Cocktail = {
      id: cocktailID,
      name: createCocktailDto.name,
      picture: cocktailID,
      ingredients: recipe,
      description: createCocktailDto.description,
      ratingsNb: null,
      rating: null,
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

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', storage))
  upload(@UploadedFile() file) {
    return {"file": file.filename}
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
