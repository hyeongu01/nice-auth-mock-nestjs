import { registerAs } from '@nestjs/config';
import type { StringValue } from 'ms';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET!,
  signOptions: {
    expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as StringValue,
  },
}));
