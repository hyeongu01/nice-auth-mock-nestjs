import { Inject, Injectable } from '@nestjs/common';
import { OauthRepository } from '@/module/oauth/oauth.repository';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '@/common/type/jwt-payload.type';

@Injectable()
export class OauthService {
  constructor(
    private readonly repository: OauthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getAccessToken() {}

  private generateToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload);
  }
}
