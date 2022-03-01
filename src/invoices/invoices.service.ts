import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './dto/orders.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './dto/order.entity';
import * as puppeteer from 'puppeteer';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
  ) {}

  async getOrderById(id: string): Promise<Order[]> {
    return this.ordersRepository.getOrder(id);
  }

  async generatePDF(content: any): Promise<Buffer> {
    // const content = rest;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    // page.addStyleTag({
    //   path: __dirname + '/../../public/CSS/certificateStyle.css',
    // });
    await page.setContent(content);
    // await page.goto(`http://localhost:3015/invoices/url/${id}`, {
    //   waitUntil: 'networkidle2',
    // });

    const buffer = await page.pdf({
      // path: 'invoice.pdf',
      format: 'a4',
      printBackground: true,
      margin: {
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
      },
    });

    await browser.close();

    return buffer;
  }
}
