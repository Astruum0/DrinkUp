import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient, IngredientDocument } from '../Schemas/ingredient.schema';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async create(ingredient: Ingredient): Promise<Ingredient> {
    const createdIngredient = new this.ingredientModel(ingredient);
    return createdIngredient.save();
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }

  async findOne(id: string): Promise<Ingredient> {
    return this.ingredientModel.findOne({ id: id }).exec();
  }
}
