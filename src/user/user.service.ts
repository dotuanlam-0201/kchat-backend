import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Model } from 'mongoose';
import { ChatGatewayService } from 'src/chat-gateway/chat-gateway.service';
import { throwInternalServerError } from 'src/lib/function/catchError';
import { AuthenticatedRequest } from 'src/lib/types/AuthenticatedRequest';
import { User } from 'src/schema/user.schema';
import { AuthenticationUserDTO, UserDTO } from 'src/user/dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService,
    private chatGatewayService: ChatGatewayService
  ) { }
  async addUser(dto: AuthenticationUserDTO) {
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
      const updateUser = await this.userModel.findOneAndUpdate({
        email: dto.email
      }, dto).exec()
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
      const token = this.extractTokenFromHeader(req)
      const decodeTokenUser = this.jwtService.decode(token ?? '')?._doc
      const user = await this.userModel.findOne({
        email: decodeTokenUser.email
      })
      if (!user) throw new Error()
      return user
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
  async getUserFromToken(token?: string) {
    const user = this.jwtService.decode(token ?? '')?._doc
    try {
      return await this.userModel.findOne({
        email: user?.email
      })
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  getOnlineUsers() {
    const onlineUserIds = Array.from(this.chatGatewayService.getOnlineUsers().keys());
    return onlineUserIds
  }
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
