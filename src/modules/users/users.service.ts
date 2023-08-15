import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { HttpStatusCode } from 'axios';
import { compare } from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
interface ModelExt<T> extends Model<T> {
  delete: (id) => any;
  findDeleted: () => any;
  restore: (id) => any;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: ModelExt<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = new this.userModel(createUserDto);
      if (await compare(user.toObject().password, 'user1234'))
        this.eventEmitter.emit('email.reset', createUserDto);
      return !!(await user.save());
    } catch (e) {
      console.error('Este es el error => ', e);
      throw new HttpException(e.message, HttpStatusCode.Conflict);
    }
  }

  async findAll(role: string) {
    if (!role) {
      return await this.userModel
        .find({ role: { $ne: '87f0a3bb-5f5c-48d0-a5f8-c7eca83098c3' } })
        .select({
          __v: false,
          _id: false,
          'contactInfo._id': false,
          'contactInfo.deleted': false,
          'fullName._id': false,
          'fullName.deleted': false,
        })
        .exec();
    } else if (role && role !== '') {
      return await this.userModel
        .find({ role })
        .select({
          __v: false,
          _id: false,
          'contactInfo._id': false,
          'contactInfo.deleted': false,
          'fullName._id': false,
          'fullName.deleted': false,
        })
        .exec();
    } else {
      return [];
    }
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ id }).exec();
  }

  async findOneByIdentification(identification: string) {
    return await this.userModel.findOne({ identification }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel
      .findOneAndUpdate({ id }, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id);
    return await this.userModel.delete({ _id });
  }

  async findDeletedItems() {
    return await this.userModel.findDeleted();
  }

  async restoreOneDeletedItem(id: string) {
    const _id = new Types.ObjectId(id);
    return await this.userModel.restore({ _id });
  }
}
