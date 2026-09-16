import { Inject, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { SecureContextOptions } from 'tls';
import { readFileSync } from 'fs';
import { type ConfigType } from '@nestjs/config';
import { databaseConfig } from '../../config/namespace/database.config';

export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly host: string;

  constructor(
    @Inject(databaseConfig.KEY) config: ConfigType<typeof databaseConfig>,
  ) {
    const { adapter, host } = createMariaDbAdapter(config.url);
    super({ adapter });
    this.host = host;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`;
      console.log(`[PrismaService] Connected to ${this.host}`);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}

function createMariaDbAdapter(rawUrl: string, caPath?: string) {
  const url = new URL(rawUrl);

  const ssl: SecureContextOptions & { rejectUnauthorized?: boolean } = caPath
    ? { ca: readFileSync(caPath), rejectUnauthorized: true }
    : { rejectUnauthorized: false };

  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port) || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    connectionLimit: 5,
    ssl,
  });

  const host = `${url.hostname}:${url.port}/${url.pathname.slice(1)}`;
  return { adapter, host };
}
