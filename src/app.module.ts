import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './core/prisma/prisma.module';
import { UserModule } from './core/user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { AuthModule } from './core/auth/auth.module';
import * as ms from 'ms';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/app.config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisConfig } from './config/redis.config';
import { configSchema } from './config/schemas/config.schema';
import { ClientModule } from './modules/client/client.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { FilialConfigModule } from './modules/filial-config/filial-config.module';
import { OrdemDeCompraItemModule } from './modules/ordem-compra-item/ordem-de-compra-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configSchema,
      load: [configuration],
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: ms('60s'),
          limit: 300,
        },
      ],
    }),
    RedisModule.forRootAsync(RedisConfig),
    PrismaModule,
    UserModule,
    AuthModule,
    ClientModule,
    FuncionarioModule,
    FilialConfigModule,
    OrdemDeCompraItemModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
