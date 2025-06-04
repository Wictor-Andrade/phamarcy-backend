import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import * as ms from 'ms';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthRedisHelper {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
  ) {}

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const key = `blacklist:${token}`;
    const isBlacklisted = await this.redis.exists(key);
    return isBlacklisted === 1;
  }

  async addToBlacklist(token: string): Promise<void> {
    const key = `blacklist:${token}`;
    const ttl = this.configService.get('jwt.refresh.expiresIn');
    await this.redis.set(key, 'blacklisted', 'PX', ms(ttl));
  }
}
