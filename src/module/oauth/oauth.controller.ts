import { Controller, Post } from '@nestjs/common';
import { OauthService } from '@/module/oauth/oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('oauth/token')
  getAccessToken() {}
}
