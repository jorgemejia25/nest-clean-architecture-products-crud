export interface Pagination<T> {
  page: number;
  limit: number;
  pages: number;
  total: number;
  data: T[];
}
