import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoicesService {


    constructor(private prismaService: PrismaService) { }


    async getInvoices(userId: number) {
        const data = await this.prismaService.user.findUnique(
            {
                where: { id: userId },
                include: { invoices: true }
            },
        )

        if (!data) {
            return { error: "User not found" };
        }

        const { password, email, ...safeData } = data;

        return safeData
    }


    async getInvoiceById(invoiceId: number, userId: number) {
        return this.prismaService.invoice.findFirst({
            where: {
                id: invoiceId,
                user_id: userId, 
            },
        });
    }
}
