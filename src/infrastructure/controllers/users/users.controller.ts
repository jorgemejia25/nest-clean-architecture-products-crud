import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UserUseCases } from 'src/usecases/user/user.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { PaginationPresenter } from 'src/infrastructure/common/swagger/presenters/pagination.presenter';
import { PaginatorPipe } from 'src/infrastructure/common/pipes/paginator.pipe';
import { RolesGuard } from 'src/infrastructure/common/guards/role.guard';
import { RolesDecorator } from 'src/infrastructure/common/decorators/roles.decorator';
import { Role } from 'src/infrastructure/common/enums/role.enum';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller('users')
@ApiTags('Users')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class UsersController {
  constructor(
    @Inject(UsecasesProxyModule.USER_USECASES_PROXY)
    private readonly userUseCases: UseCaseProxy<UserUseCases>,
  ) {}

  @Get()
  @RolesDecorator(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'Get users paginated',
  })
  async getUsers(@Query(PaginatorPipe) { page, limit }: PaginationPresenter) {
    return await this.userUseCases.getInstance().getUsers(page, limit);
  }

  @Post()
  @RolesDecorator(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'Create a new user',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userUseCases.getInstance().createUser(createUserDto);
  }

  @Put()
  @RolesDecorator(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'Update a user',
  })
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.userUseCases.getInstance().updateUser(updateUserDto);
  }

  @Delete()
  @RolesDecorator(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'Delete a user',
  })
  async deleteUser(@Query('id') id: string) {
    return await this.userUseCases.getInstance().deleteUser(id);
  }

  @Post('restore')
  @RolesDecorator(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    description: 'Restore a user',
  })
  async restoreUser(@Query('id') id: string) {
    return await this.userUseCases.getInstance().restoreUser(id);
  }
}
