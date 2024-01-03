import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import configuration from '../../config/configuration'
import { ApiConfigModule, ApiConfigService } from '@mvx-monorepo/common'

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (apiConfigService: ApiConfigService) => ({
        redis: {
          host: apiConfigService.getRedisUrl(),
          port: 6379,
        },
      }),
      imports: [ApiConfigModule.forRoot(configuration)],
      inject: [ApiConfigService],
    }),
  ],
})
export class BullQueueModule {}
