import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {

  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

  async insertUser(userName: string, password: string): Promise<any> {
    const username = userName.toLowerCase();

    return await new this.userModel({
      username, password
    }).save();
  }

  async getUser(userName: string): Promise<User> {
    let username = userName.toLowerCase();
    return await this.userModel.findOne({username});
  }
}
