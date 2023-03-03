import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient, IngredientDocument } from '../schemas/ingredient.schema';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async create(): Promise<Ingredient> {
    const createdCat = new this.ingredientModel();
    return createdCat.save();
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }
}
