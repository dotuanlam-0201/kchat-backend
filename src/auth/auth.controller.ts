import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/auth/dto/auth.dto';
import { UserDTO } from 'src/user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/login')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto)
  }
  @Post('/signup')
  signup(@Body() dto: UserDTO) {
    return this.authService.signup(dto)
  }
}
