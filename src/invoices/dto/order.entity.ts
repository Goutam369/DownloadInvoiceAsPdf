import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  title: string;

  @Column()
  product_type: string;

  @Column()
  manufacturer_name: string;

  @Column()
  quantity: string;

  @Column()
  price: string;

  @Column()
  date: string;

  @Column()
  total_amount: string;
}
