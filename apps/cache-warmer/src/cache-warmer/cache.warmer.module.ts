import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import configuration from '../../config/configuration'
import { CacheWarmerService } from './cache.warmer.service'
import { AppModule } from '@mvx-monorepo/common/app/app.module'
import { DynamicModuleUtils } from '@mvx-monorepo/common/utils/dynamic.module.utils'

@Module({
  imports: [ScheduleModule.forRoot(), AppModule.forRoot(configuration)],
  providers: [DynamicModuleUtils.getPubSubService(), CacheWarmerService],
})
export class CacheWarmerModule {}
