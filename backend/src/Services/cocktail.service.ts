import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cocktail, CocktailDocument } from '../Schemas/Cocktail.schema';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectModel(Cocktail.name)
    private cocktailModel: Model<CocktailDocument>,
  ) {}

  async create(cocktail: Cocktail): Promise<Cocktail> {
    const createdCocktail = new this.cocktailModel(cocktail);
    return createdCocktail.save();
  }

  async findAll(): Promise<Cocktail[]> {
    return this.cocktailModel.find().exec();
  }

  async findOne(id: string): Promise<Cocktail> {
    return this.cocktailModel.findOne({ id: id }).exec();
  }
}
