import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { config } from 'apps/cache-warmer/config'
import { DelegationModule } from '@mvx-monorepo/common'
import { CacheWarmerService } from './cache.warmer.service'
import { AppModule } from '@mvx-monorepo/common/app/app.module'
import { DynamicModuleUtils } from '@mvx-monorepo/common/utils/dynamic.module.utils'

@Module({
  imports: [ScheduleModule.forRoot(), AppModule.forRoot(config), DelegationModule.forRoot(config)],
  providers: [DynamicModuleUtils.getPubSubService(), CacheWarmerService],
})
export class CacheWarmerModule {}
