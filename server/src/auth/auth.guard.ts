import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authheader = request.headers.authorization;
    const token = authheader?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Missing Token");
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      request.user = {
        id: tokenPayload.sub,
        email: tokenPayload.email,
        name: tokenPayload.name
      }

      return true;

    } catch (e) {
      throw new UnauthorizedException("Invalid Token");
    }

  }
}
