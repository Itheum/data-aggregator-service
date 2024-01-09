import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { config } from 'apps/queue-worker/config'
import { AppConfigModule, AppConfigService } from '@mvx-monorepo/common'

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => ({
        redis: {
          host: appConfigService.redisUrl,
          port: 6379,
        },
      }),
      imports: [AppConfigModule.forRoot(config)],
      inject: [AppConfigService],
    }),
  ],
})
export class BullQueueModule {}
