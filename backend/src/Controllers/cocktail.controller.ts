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
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

const storage = {
  storage: diskStorage({
    destination: './uploads/cocktails',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + randomUUID();
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
  // @UseInterceptors(
  //   FileInterceptor('file', storage))
  // create(@UploadedFile() file) {
  //   console.log("hello",file);
  //   return {"file": file.filename}
    // const cocktail: Cocktail = {
    //   id: randomUUID(),
    //   name: createCocktailDto.name,
    //   picture: file.filename,
    //   ingredients: createCocktailDto.ingredients,
    //   description: createCocktailDto.description,
    //   ratingsNb: null,
    //   rating: null,
    // };
    // try {
    //   return this.cocktailService.create(cocktail);
    // } catch (e: unknown) {
    //   return {
    //     error:
    //       typeof e === 'string'
    //         ? e.toUpperCase()
    //         : e instanceof Error
    //         ? e.message
    //         : 'Error',
    //   };
    // }
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

  @Get()
  findAll() {
    return this.cocktailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
