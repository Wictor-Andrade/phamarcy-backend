import { RedisModuleAsyncOptions } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

export const RedisConfig: RedisModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => {
    const host = configService.get<string>('redis.host') || 'redis';
    const port = configService.get<number>('redis.port') || 6379;
    const password = configService.get<string>('redis.password');
    const db = configService.get<number>('redis.db') || 0;

    const redisUrl = `redis://${host}:${port}`;
    return {
      type: 'single',
      url: redisUrl,
      options: {
        password,
        db,
      },
    };
  },
  inject: [ConfigService],
};
