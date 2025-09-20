import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; 
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { InvoicesController } from './invoices/invoices.controller';
import { InvoicesService } from './invoices/invoices.service';

@Module({
  imports: [ AuthModule],
  controllers: [AppController, InvoicesController],
  providers: [AppService, InvoicesService],
})
export class AppModule { }
