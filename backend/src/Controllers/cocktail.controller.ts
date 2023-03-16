import { randomUUID } from 'crypto';
import { Cocktail } from './../Schemas/cocktail.schema';
import { CreateCocktailDto } from './../Dto/create-cocktail.dto';
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { CocktailsService } from 'src/Services/cocktail.service';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailService: CocktailsService) {}

  @Post('/create')
  create(@Body() createCocktailDto: CreateCocktailDto) {
    const cocktail: Cocktail = {
      id: randomUUID(),
      name: createCocktailDto.name,
      picture: createCocktailDto.picture,
      ingredients: createCocktailDto.ingredients,
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
