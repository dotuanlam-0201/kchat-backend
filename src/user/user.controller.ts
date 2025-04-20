import { Body, Controller, Get, Put } from '@nestjs/common';
import { UserDTO } from 'src/user/dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  // @Post('/add')
  // addUser(@Body() dto: UserDTO) {
  //   return this.userService.addUser(dto)
  // }
  @Put('/update')
  updateUser(@Body() dto: UserDTO) {
    return this.userService.updateUser(dto)
  }
  @Get()
  getUsers() {
    return this.userService.getUsers()
  }
}
