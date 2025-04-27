import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { get, omit } from 'lodash';
import { Model } from 'mongoose';
import { throwInternalServerError } from 'src/lib/function/catchError';
import { AuthenticatedRequest } from 'src/lib/types/AuthenticatedRequest';
import { User } from 'src/schema/user.schema';
import { UserDTO } from 'src/user/dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) { }
  async addUser(dto: UserDTO) {
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(dto.password, salt);

      const payload = {
        ...dto, password: passwordHash
      }
      return await new this.userModel(payload).save()
    } catch (error) {
      if (error?.code === 11000) throw new BadRequestException("Email is exist!")
      throwInternalServerError(error)
    }
  }
  async updateUser(dto: UserDTO) {
    try {
      const { password, ...others } = dto
      const updateUser = await this.userModel.findOneAndUpdate({
        email: dto.email
      }, others).exec()
      if (!updateUser) throw new NotFoundException("User not found")
      return updateUser
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async getUsers() {
    try {
      return await this.userModel.find()
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async getUserByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email: email },)
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async getUserById(id: string) {
    try {
      return await this.userModel.findById(id)
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async getMe(req: AuthenticatedRequest) {
    try {
      const user = get(req, 'user')
      return omit(user, 'password')
    } catch (error) {
      throwInternalServerError(error)
    }
  }
}
