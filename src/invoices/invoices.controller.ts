import { Controller, Get, Param, Render } from '@nestjs/common';
import { Order } from './dto/order.entity';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  //   @Get('/:id')
  //   getOrderById(@Param('id') id: string): Promise<Order[]> {
  //     return this.invoicesService.getOrderById(id);
  //   }

  @Get('/:id')
  @Render('invoice/index')
  root(@Param('id') id: string) {
    return this.invoicesService.getOrderById(id).then((result) => {
      if (result) {
        let sum = 0;
        const date = result[0].date;
        result.forEach((element) => {
          sum += parseInt(element.total_amount);
        });
        return { order_id: id, invoices: result, totalAmount: sum, date: date };
      } else {
        return { order_id: null, invoices: [], totalAmount: 0, date: null };
      }
    });
  }
}
