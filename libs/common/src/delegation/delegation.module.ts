import { Module } from '@nestjs/common'
import { DelegationService } from './delegation.service'
import { AppConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'
import { ContractModule } from '@mvx-monorepo/common/contract/contract.module'

@Module({})
export class DelegationModule {
  static forRoot(config: () => any) {
    return {
      module: DelegationModule,
      imports: [AppConfigModule.forRoot(config), DynamicModuleUtils.getCachingModule(config), ContractModule.forRoot(config)],
      providers: [DelegationService],
      exports: [DelegationService],
    }
  }
}
