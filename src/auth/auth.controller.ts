import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { LoginDTO } from 'src/auth/dto/auth.dto';
import { AuthenticationUserDTO } from 'src/user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/login')
  @Public()
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto)
  }

  @Public()
  @Post('/signup')
  signup(@Body() dto: AuthenticationUserDTO) {
    return this.authService.signup(dto)
  }
}
