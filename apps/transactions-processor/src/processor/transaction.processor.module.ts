import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { config } from 'apps/transactions-processor/config'
import { AppConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'
import { TransactionProcessorService } from './transaction.processor.service'

@Module({
  imports: [ScheduleModule.forRoot(), AppConfigModule.forRoot(config), DynamicModuleUtils.getCachingModule(config)],
  providers: [TransactionProcessorService],
})
export class TransactionProcessorModule {}
