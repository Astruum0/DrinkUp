import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/Controllers/users.controller';
import { UserSchema } from 'src/Schemas/users.schema';
import { UsersService } from 'src/Services/users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
