import { ProductM } from '../model/product';

export interface ProductRepository {
  insert(todo: ProductM): Promise<ProductM>;
  findAll(): Promise<ProductM[]>;
  findById(id: string): Promise<ProductM>;
  updateById(id: string, todo: ProductM): Promise<ProductM>;
  deleteById(id: string): Promise<void>;
}
