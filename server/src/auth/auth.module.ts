import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStartegy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';


@Module({
    imports: [PassportModule, UsersModule, JwtModule.register({
        global: true,
        secret: JWT_SECRET,
        signOptions: { expiresIn: "30d" }
    })],
    providers: [AuthService, LocalStartegy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
