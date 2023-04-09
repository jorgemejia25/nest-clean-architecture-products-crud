import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsCurrency,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  id: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  originalPrice: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  price: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isAvailable: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class DeleteProductDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
