import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/lib/types/AuthenticatedRequest';
import { UserDTO } from 'src/user/dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Put('/update')
  updateUser(@Body() dto: UserDTO) {
    return this.userService.updateUser(dto)
  }
  @Get()
  getUsers() {
    return this.userService.getUsers()
  }
  @Get('/me')
  getMe(@Request() req: AuthenticatedRequest) {
    return this.userService.getMe(req)
  }

}
