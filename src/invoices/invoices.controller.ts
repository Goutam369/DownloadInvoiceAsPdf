import {
  Controller,
  Get,
  Param,
  Render,
  Res,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { Order } from './dto/order.entity';
import { InvoicesService } from './invoices.service';
import { Response } from 'express';
import * as hbs from 'hbs';
import { join } from 'path/posix';
import * as fs from 'fs';

const compile = async (templateName, data) => {
  const filePath = join(
    __dirname,
    '..',
    '..',
    'views',
    'invoice',
    `${templateName}.hbs`,
  );
  if (!filePath) {
    throw new Error(`Could not find ${templateName}.hbs in generatePDF`);
  }
  const html = await fs.readFileSync(filePath, 'utf-8');
  return hbs.compile(html)(data);
};

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get('/:id')
  // @Render('invoice/index')
  @Header('content-type', 'application/pdf')
  async root(@Param('id') id: string, @Res() res: Response) {
    const result = await this.invoicesService.getOrderById(id);

    let sum = 0;
    const date = result[0].date;
    result.forEach((element) => {
      sum += parseInt(element.total_amount);
    });

    const data = {
      order_id: id,
      invoices: result,
      totalAmount: sum,
      date: date,
    };

    const rest = await compile('index', data);
    const pdf = await this.invoicesService.generatePDF(rest);

    res.send(pdf);
  }
}
