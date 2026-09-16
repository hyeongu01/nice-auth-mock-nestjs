import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '@/lib/prisma/prisma.module';
import { AppConfigModule } from '@/config/config.module';
import { OauthModule } from '@/module/oauth/oauth.module';

@Module({
  imports: [AppConfigModule, PrismaModule, OauthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
