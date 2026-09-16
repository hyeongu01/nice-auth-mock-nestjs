import { jwtConfig } from '@/config/namespace/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';

export const AppJwtModule = JwtModule.registerAsync({
  inject: [jwtConfig.KEY],
  useFactory: (config: ConfigType<typeof jwtConfig>) => ({
    secret: config.secret,
    signOptions: config.signOptions,
  }),
});
