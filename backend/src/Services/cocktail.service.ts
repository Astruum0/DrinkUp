import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cocktail, CocktailDocument } from '../Schemas/cocktail.schema';
import { ingredientsListDto } from 'src/Dto/ingredients-list.dto';
import { UpdateCocktailDto } from 'src/Dto/update-cocktail.dto';

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

  async delete(id: string) {
    return this.cocktailModel.deleteOne({ id: id }).exec();
  }

  async findDoableCocktails(
    ingredientsList: ingredientsListDto,
  ): Promise<{ doable: Cocktail[]; partially: Cocktail[] }> {
    const all = (await this.cocktailModel.find().exec()) as Cocktail[];
    const partially = [];
    const doable = [];
    let percentage: number;
    for (let i = 0; i < all.length; i++) {
      const cocktail = all[i];
      let completion = 0;
      for (let j = 0; j < cocktail.ingredients.length; j++) {
        if (
          ingredientsList.ingredients.includes(
            cocktail.ingredients[j].ingredient.id,
          )
        ) {
          completion += 1;
        }
      }
      percentage = completion / cocktail.ingredients.length;
      if (percentage == 1) {
        doable.push(cocktail);
      } else if (percentage >= 0.25) {
        partially.push(cocktail);
      }
    }
    return {
      doable,
      partially,
    };
  }

  async updateCocktail(id: string, post: UpdateCocktailDto) {
    const cocktail = await this.cocktailModel
      .findOneAndUpdate({ id: id }, post, { new: true })
      .populate('name')
      .populate('picture')
      .populate('ingredients')
      .populate('rating')
      .populate('description');
    if (!cocktail) {
      throw new NotFoundException();
    }
    return cocktail;
  }
}
