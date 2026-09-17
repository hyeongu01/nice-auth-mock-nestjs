import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@/prisma/client';

export class SignupResponse {
  @ApiProperty()
  client_id: string;

  @ApiProperty()
  client_secret: string;

  static from(client: Client, secret: string): SignupResponse {
    return {
      client_id: client.id,
      client_secret: secret,
    };
  }
}
