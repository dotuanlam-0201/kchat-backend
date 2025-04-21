import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import { UserDTO } from 'src/user/dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Put('/update')
  updateUser(@Body() dto: UserDTO) {
    return this.userService.updateUser(dto)
  }
  @Get()
  getUsers(@Request() req: Request) {
    return this.userService.getUsers()
  }
  @Get('/me')
  getMe(@Request() req: Request) {
    return this.userService.getMe(req.headers['authorization'])
  }

}
