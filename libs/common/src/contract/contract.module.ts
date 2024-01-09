import { Module } from '@nestjs/common'
import { ContractService } from './contract.service'
import { AppConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'

@Module({})
export class ContractModule {
  static forRoot(config: () => any) {
    return {
      module: ContractModule,
      imports: [AppConfigModule.forRoot(config), DynamicModuleUtils.getCachingModule(config)],
      providers: [ContractService],
      exports: [ContractService],
    }
  }
}
