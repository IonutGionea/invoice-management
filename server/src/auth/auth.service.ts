import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthData, AuthUserData } from "src/types";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jswService: JwtService) { }

    async login(user: AuthData): Promise<AuthUserData> { 

        const jwtPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        }
        const accessToken = await this.jswService.signAsync(jwtPayload)

        return { ...user, token: accessToken }

    }

    async validateUser(email: string, password: string): Promise<AuthData> {

        const user = await this.userService.findUserByEmail(email);
        

        if (!user) throw new UnauthorizedException("Wrong details")

        if (password !== user.password) throw new UnauthorizedException("Invalid credentials")

        return {
            email: user.email,
            name: user.name,
            id: user.id
        };
    }
}