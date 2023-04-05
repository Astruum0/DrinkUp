import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/Services/users.service';
import { User } from 'src/Schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { LogError } from 'src/Types/logError';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('email') email: string,
  ): Promise<User | LogError> {
    if (!username || !email || !password) {
      return { type: 'RequestError', description: 'Invalid Body' };
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    try {
      const result = await this.usersService.createUser(
        username,
        hashedPassword,
        // email,
      );
      return result;
    } catch (err) {
      if (err instanceof Error) {
        return { type: 'FieldError', description: err.message };
      } else {
        return { type: 'UnknownError', description: err };
      }
    }
  }
}
