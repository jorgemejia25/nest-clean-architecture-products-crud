import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Get,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsAuthPresenter } from './auth.presenter';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { AuthUseCases } from 'src/usecases/auth/auth.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { LoginGuard } from 'src/infrastructure/common/guards/login.guard';
import { AuthLoginDto } from './auth.dto';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import JwtRefreshGuard from 'src/infrastructure/common/guards/jwtRefresh.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.AUTH_USECASES_PROXY)
    private readonly authUseCases: UseCaseProxy<AuthUseCases>,
  ) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: AuthLoginDto,
  })
  @ApiOperation({
    description: 'Login with email and password',
  })
  async login(@Body() auth: AuthLoginDto, @Request() request: any) {
    const accessTokenCookie = await this.authUseCases
      .getInstance()
      .getCookieWithJwtToken(auth.username);
    const refreshTokenCookie = await this.authUseCases
      .getInstance()
      .getCookieWithJwtRefreshToken(auth.username);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return 'Login successful';
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Logout',
  })
  async logout(@Request() request: any) {
    const cookie = await this.authUseCases.getInstance().logout();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Get('is-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Check if user is authenticated',
  })
  @ApiResponseType(IsAuthPresenter, false)
  async isAuth(@Request() request: any) {
    return this.authUseCases
      .getInstance()
      .isAuthenticated(request.user.username);
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.authUseCases
      .getInstance()
      .getCookieWithJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Refresh successful';
  }
}
