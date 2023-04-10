import { Pagination } from '../model/pagination';
import { ProductM } from '../model/product';

export interface ProductRepository {
  insert(todo: ProductM): Promise<ProductM>;
  findAll(page: number, limit: number): Promise<Pagination<ProductM>>;
  findById(id: string): Promise<ProductM>;
  updateById(id: string, todo: ProductM): Promise<ProductM>;
  deleteById(id: string): Promise<void>;
}
