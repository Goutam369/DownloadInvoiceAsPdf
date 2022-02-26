import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async getOrder(order_id: string): Promise<Order[]> {
    const orders = await this.find({ where: { order_id: order_id } });
    return orders;
  }
}
