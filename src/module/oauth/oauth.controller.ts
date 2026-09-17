import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { OauthService } from '@/module/oauth/oauth.service';
import { GetAccessTokenResponse } from '@/module/oauth/type/get-access-token-response.type';
import { SignupDto } from '@/module/oauth/dto/signup.dto';
import { type SignupResponse } from '@/module/oauth/type/signup-response.type';

@Controller('oauth')
export class OauthController {
  constructor(private readonly service: OauthService) {}

  @Post('oauth/token')
  getAccessToken(@Req() req: Request): Promise<GetAccessTokenResponse> {
    const authorization = req.headers.authorization;
    if (!authorization)
      throw new UnauthorizedException('Authorization required');

    const [tokenType, token] = authorization.split(' ');
    if (tokenType.toLowerCase() !== 'basic')
      throw new UnauthorizedException('Invalid token type');

    return this.service.getAccessToken(token);
  }

  @Post('oauth/signup')
  createClient(@Body() dto: SignupDto): Promise<SignupResponse> {
    return this.service.createClient(dto);
  }
}
