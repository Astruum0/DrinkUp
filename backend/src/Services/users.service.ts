import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string, 
        // email: string
        ): Promise<User> {

        if (await this.getUser({username})) {
            throw new Error("Username already used")
        }
        // if (await this.getUser({email})) {
        //     throw new Error("Email already used")
        // }

        return this.userModel.create({
            id: randomUUID(),
            username,
            password,
            // email,
            // profile_pic: "",
            // admin_role: false
        });
    }
    if (await this.getUser({ email })) {
      throw new Error('Email already used');
    }

    return this.userModel.create({
      id: randomUUID(),
      username,
      password,
      email,
      profile_pic: '',
      admin_role: false,
    });
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
}
