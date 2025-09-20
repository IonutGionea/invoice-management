import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { type RequestWithUser } from './types';
import { AppService } from './app.service';

@Controller()
export class AppController { 

}
