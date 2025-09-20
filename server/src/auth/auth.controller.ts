import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { type RequestWithUser } from 'src/types';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request: RequestWithUser) {
        return this.authService.login(request.user)
    }
}
