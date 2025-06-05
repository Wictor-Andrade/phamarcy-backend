import { Module } from '@nestjs/common';
import { FilialConfigService } from './filial-config.service';
import { FilialConfigController } from './filial-config.controller';
import { FilialConfigRepository } from './filial-config.repository';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FilialConfigController],
  providers: [FilialConfigService, FilialConfigRepository],
  exports: [FilialConfigService],
})
export class FilialConfigModule {}
