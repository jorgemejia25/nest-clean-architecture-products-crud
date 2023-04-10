import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { SerializeOptions } from '@nestjs/common';
import { Transform } from 'class-transformer';

export class PaginationPresenter {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, default: 1 })
  page: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, default: 10 })
  limit: number;
}
