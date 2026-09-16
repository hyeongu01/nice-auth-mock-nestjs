import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { Prisma } from '@/prisma/client';
import { ulid } from 'ulid';
import { toHash } from '@/common/util/hash';

@Injectable()
export class OauthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccessToken(
    clientId: string,
    option: {
      tx?: Prisma.TransactionClient;
    } = {},
  ) {
    const { tx = this.prismaService } = option;
    const date = new Date();
    const newToken = ulid();
    const hashedToken = toHash(newToken);

    return tx.accessToken.create({
      data: {
        tokenHash: hashedToken,
        expiresAt: new Date(date.getTime() + 50 * 360 * 3600 * 24 * 1000),
        clientId,
      },
    });
  }
}
