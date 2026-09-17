import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/lib/prisma/prisma.service';
import { AccessToken, Client, Prisma } from '@/prisma/client';
import { ulid } from 'ulid';
import { toHash } from '@/common/util/hash';

@Injectable()
export class OauthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getClientById(id: string): Promise<Client | null> {
    return this.prismaService.client.findUnique({ where: { id } });
  }

  async createAccessToken(
    clientId: string,
    accessToken: string,
    option: {
      tx?: Prisma.TransactionClient;
    } = {},
  ): Promise<AccessToken> {
    const { tx = this.prismaService } = option;
    const date = new Date();
    const hashedToken = toHash(accessToken);

    return tx.accessToken.create({
      data: {
        tokenHash: hashedToken,
        expiresAt: new Date(date.getTime() + 50 * 360 * 3600 * 24 * 1000),
        clientId,
      },
    });
  }

  async createClient(name: string, clientSecret: string): Promise<Client> {
    const hashedSecret = toHash(clientSecret);

    return this.prismaService.client.create({
      data: {
        name,
        clientSecretHash: hashedSecret,
      },
    });
  }
}
