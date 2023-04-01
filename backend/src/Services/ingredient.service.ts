import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient, IngredientDocument } from '../Schemas/ingredient.schema';
import { randomUUID } from 'crypto';

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

  async newIngredient(name: string): Promise<Ingredient> {
    const ingredient: Ingredient = {
      id: randomUUID(),
      keywords: undefined,
      name: name,
      picture: undefined,
      type: undefined,
    }
    return this.create(ingredient)
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }

  async findOne(id: string): Promise<Ingredient> {
    return this.ingredientModel.findOne({ id: id }).exec();
  }
  async findByName(name: string): Promise<Ingredient> {
    return this.ingredientModel.findOne({ name: name }).exec();
  }
}
