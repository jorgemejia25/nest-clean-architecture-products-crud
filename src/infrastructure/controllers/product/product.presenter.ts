import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from 'src/domain/model/product';

export class ProductPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  originalPrice: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  isAvailable: boolean;

  constructor(product: ProductM) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.category = product.category;
    this.originalPrice = product.originalPrice;
    this.amount = product.amount;
    this.isAvailable = product.isAvailable;
  }
}
