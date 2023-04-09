import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  category: string;

  @Column({
    type: 'decimal',
  })
  originalPrice: number;

  @Column({
    type: 'decimal',
  })
  price: number;

  @Column()
  amount: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  isAvailable: boolean;
}
