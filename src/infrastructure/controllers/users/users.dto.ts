import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { Role } from 'src/infrastructure/common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  readonly active: boolean;

  readonly hashRefreshToken: string;
  readonly lastLogin: Date;
  readonly createDate: Date;
  readonly updatedDate: Date;
  readonly id: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
