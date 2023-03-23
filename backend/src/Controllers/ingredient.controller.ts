import { Ingredient } from 'src/schemas/ingredient.schema';
import { CreateIngredientDto } from './../Dto/create-ingredient.dto';
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { IngredientsService } from 'src/Services/ingredient.service';
import { randomUUID } from 'crypto';
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientsService) {}

  @Post('/create')
  @ApiCreatedResponse({
    status: 201,
    description: 'The Ingredient has been successfully created.',
    type: CreateIngredientDto,
  })
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
  @ApiResponse({
    status: 200,
    description: 'Returns all the ingredients',
    type: [Ingredient],
  })
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the given ingredient',
    type: Ingredient,
  })
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deletes an ingredient',
    type: String,
  })
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
