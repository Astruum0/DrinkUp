import { CocktailsModule } from './Modules/cocktail.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientsModule } from './Modules/ingredient.module';
import { UsersModule } from './Modules/users.module';
import { AuthModule } from './Modules/auth.module';
import { ImageModule } from './Modules/image.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/drinkup'),
    IngredientsModule,
    CocktailsModule,
    UsersModule,
    AuthModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
