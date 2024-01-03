import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import configuration from '../../config/configuration'
import { CacheWarmerService } from './cache.warmer.service'
import { ContractModule } from '@mvx-monorepo/common/contract/contract.module'
import { DynamicModuleUtils } from '@mvx-monorepo/common/utils/dynamic.module.utils'

@Module({
  imports: [ScheduleModule.forRoot(), ContractModule.forRoot(configuration)],
  providers: [DynamicModuleUtils.getPubSubService(), CacheWarmerService],
})
export class CacheWarmerModule {}
