import { Role } from '../enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: Role[]) =>
  SetMetadata(ROLES_KEY, roles);
