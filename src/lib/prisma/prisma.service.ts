import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const url = URL();
    const adapter = new PrismaMariaDb({});
    super({});
  }
}
