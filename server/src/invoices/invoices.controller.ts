import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import * as types from 'src/types';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { type RequestWithUser } from 'src/types';

@Controller('invoices')
export class InvoicesController {

    constructor(private invoiceService: InvoicesService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getInvoices(@Request() request: RequestWithUser) {
        return await this.invoiceService.getInvoices(request.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getInvoice(@Param('id') id: string, @Request() request: RequestWithUser) {
        // request.user comes from JwtStrategy.validate()
        const userId = request.user.id;

        return await this.invoiceService.getInvoiceById(Number(id), userId);
    }

}
