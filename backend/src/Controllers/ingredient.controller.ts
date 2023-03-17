import { Ingredient } from 'src/schemas/ingredient.schema';
import { CreateIngredientDto } from './../Dto/create-ingredient.dto';
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { IngredientsService } from 'src/Services/ingredient.service';
import { randomUUID } from 'crypto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientsService) {}

  @Post('/create')
  create(@Body() createIngredientDto: CreateIngredientDto) {
    const ingredient: Ingredient = {
      id: randomUUID(),
      keywords: createIngredientDto.keywords,
      name: createIngredientDto.name,
      picture: createIngredientDto.picture,
      type: createIngredientDto.type,
    };
    try {
      return this.ingredientService.create(ingredient);
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
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
