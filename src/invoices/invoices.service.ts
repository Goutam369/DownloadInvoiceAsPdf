import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './dto/orders.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './dto/order.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
  ) {}

  async getOrderById(id: string): Promise<Order[]> {
    return this.ordersRepository.getOrder(id);
  }
}
