import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post("register")
  async register(@Body() createUserDto: SignUpDto) {
    return await this.authService.register(createUserDto)
  }

  @Post("login")
  async login(@Body() createAuthDto: SignInDto) {
    return await this.authService.login(createAuthDto)
  }

}
