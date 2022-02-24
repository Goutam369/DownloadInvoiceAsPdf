import { randomUUID } from 'crypto';
import { EntityRepository, Repository } from 'typeorm';
// import { CreateOrderDto } from './create-order.dto';
import { GetOrdersFilterDto } from './get-orders-filter.dto';
import { Order } from './order.entity';

// function currDate(): string {
//   const date = new Date();
//   const day = ('0' + date.getDate()).slice(-2);
//   const month = ('0' + (date.getMonth() + 1)).slice(-2);
//   const year = date.getFullYear();
//   const res = `${year}-${month}-${day}`;
//   return res;
// }

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async getOrder(order_id: string): Promise<Order[]> {
    // const { order_id } = filterDto;

    const query = this.createQueryBuilder('order');

    if (order_id) {
      query.andWhere('order.order_id = :order_id', { order_id });
    }

    const orders = await query.getMany();
    return orders;
  }

  //   async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
  //     const {
  //       product_id,
  //       title,
  //       product_type,
  //       manufacturer_name,
  //       quantity,
  //       price,
  //       order_id,
  //     } = createOrderDto;
  //     if (order_id === undefined || order_id === '') {
  //       const order = this.create({
  //         order_id: randomUUID(),
  //         product_id,
  //         title,
  //         product_type,
  //         manufacturer_name,
  //         quantity,
  //         price,
  //         date: currDate(),
  //         total_amount: (parseInt(quantity) * parseInt(price)).toString(10),
  //       });
  //       await this.save(order);
  //       return order;
  //     } else {
  //       const order = this.create({
  //         order_id,
  //         product_id,
  //         title,
  //         product_type,
  //         manufacturer_name,
  //         quantity,
  //         price,
  //         date: currDate(),
  //         total_amount: (parseInt(quantity) * parseInt(price)).toString(10),
  //       });
  //       await this.save(order);
  //       return order;
  //     }
  //   }
}
