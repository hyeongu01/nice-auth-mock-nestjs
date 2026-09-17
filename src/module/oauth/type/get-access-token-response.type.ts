import { ApiProperty } from '@nestjs/swagger';
import { type AccessToken } from '@/prisma/client';

export class GetAccessTokenResponse {
  @ApiProperty({
    example: 'ff5e27fe-8b5d-49db-ab1e-0ccf07de6ac1',
  })
  access_token: string;

  @ApiProperty({
    default: 'bearer',
    example: 'bearer',
  })
  token_type: string = 'bearer';

  @ApiProperty({
    description: '만료 기한 (초)',
  })
  expires_in: number;

  @ApiProperty({
    default: 'default',
  })
  scope: string = 'default';

  static from(accessToken: string, item: AccessToken): GetAccessTokenResponse {
    return {
      access_token: accessToken,
      expires_in: item.expiresAt.getTime() / 1000,
      token_type: 'bearer',
      scope: 'default',
    };
  }
}
