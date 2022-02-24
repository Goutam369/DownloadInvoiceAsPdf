import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from './dto/orders.repository';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersRepository])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
