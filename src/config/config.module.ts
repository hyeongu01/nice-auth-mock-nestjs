import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { databaseConfig } from './namespace/database.config';
import * as Joi from 'joi';
import { jwtConfig } from '@/config/namespace/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string()
          .uri({ scheme: ['mysql'] })
          .required(),
        JWT_SECRET: Joi.string().length(3).required(),
        JWT_EXPIRES_IN: Joi.string().pattern(/^\d+([yMdhms])$/),
      }),
    }),
  ],
})
export class AppConfigModule {}
