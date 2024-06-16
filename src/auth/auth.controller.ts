import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/registro.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(
    @Body()
    registerDto: any,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('register_admin')
  registerAdmin(
    @Body()
    registerDto: any,
  ) {
    return this.authService.register_Admin(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: any,
  ) {
    return this.authService.login(loginDto);
  }

  @Post('login_admin')
  loginAdmin(
    @Body()
    loginDto: any,
  ) {
    return this.authService.login_Admin(loginDto);
  }
}
