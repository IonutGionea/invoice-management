import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type User = {
    id: number;
    name: string;
    password: string;
    email: string;
}

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } })
        if (!user) return null;
        return user;
    }
    async findUserById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } }) 
        if (!user) return null;
        return user;
    }
}
