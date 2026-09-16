import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { OauthRepository } from '@/module/oauth/oauth.repository';
import { AppJwtModule } from '@/lib/jwt/jwt.module';

@Module({
  imports: [AppJwtModule],
  controllers: [OauthController],
  providers: [OauthService, OauthRepository],
})
export class OauthModule {}
