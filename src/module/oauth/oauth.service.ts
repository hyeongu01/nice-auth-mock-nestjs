import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OauthRepository } from '@/module/oauth/oauth.repository';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '@/common/type/jwt-payload.type';
import { GetAccessTokenResponse } from '@/module/oauth/type/get-access-token-response.type';
import { Client } from '@/prisma/client';
import { toHash } from '@/common/util/hash';
import { SignupResponse } from '@/module/oauth/type/signup-response.type';
import { ulid } from 'ulid';
import { SignupDto } from '@/module/oauth/dto/signup.dto';

@Injectable()
export class OauthService {
  constructor(
    private readonly repository: OauthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getAccessToken(token: string): Promise<GetAccessTokenResponse> {
    const [clientId, clientSecret] = Buffer.from(token, 'base64')
      .toString('utf-8')
      .split(':');
    const client: Client | null = await this.repository.getClientById(clientId);
    if (!client || toHash(clientSecret) !== client.clientSecretHash)
      throw new UnauthorizedException('Client does not exist');

    const newAccessToken = this.generateToken({ sub: clientId });
    const accessToken = await this.repository.createAccessToken(
      clientId,
      newAccessToken,
    );
    return GetAccessTokenResponse.from(newAccessToken, accessToken);
  }

  async createClient(dto: SignupDto): Promise<SignupResponse> {
    const newSecret = ulid();
    const client: Client = await this.repository.createClient(
      dto.name,
      newSecret,
    );

    return SignupResponse.from(client, newSecret);
  }

  private generateToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload);
  }
}
