import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { PaginationPresenter } from '../swagger/presenters/pagination.presenter';

export interface PaginatorType {
  page: string;
  limit: string;
}

@Injectable()
export class PaginatorPipe
  implements PipeTransform<PaginatorType, PaginationPresenter>
{
  transform(
    value: PaginatorType,
    metadata: ArgumentMetadata,
  ): PaginationPresenter {
    const { page, limit } = value;

    const paginationPresenter = new PaginationPresenter();

    paginationPresenter.page = (Number(page) || 1) - 1;
    paginationPresenter.limit = Number(limit) || 10;

    return paginationPresenter;
  }
}
