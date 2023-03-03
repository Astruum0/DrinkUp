import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientsModule } from './Modules/ingredient.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/drinkup'),
    IngredientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
