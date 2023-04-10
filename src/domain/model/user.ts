import { Role } from 'src/infrastructure/common/enums/role.enum';

export class UserWithoutPassword {
  id: string;
  username: string;
  createDate: Date;
  updatedDate: Date;
  lastLogin: Date;
  role: Role;
  hashRefreshToken: string;
  active: boolean;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
