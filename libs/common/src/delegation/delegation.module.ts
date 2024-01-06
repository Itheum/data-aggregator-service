import { Module } from '@nestjs/common'
import { DelegationService } from './delegation.service'
import { ApiConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'
import { ContractModule } from '@mvx-monorepo/common/contract/contract.module'

@Module({})
export class DelegationModule {
  static forRoot(configuration: () => Record<string, any>) {
    return {
      module: DelegationModule,
      imports: [
        ApiConfigModule.forRoot(configuration),
        DynamicModuleUtils.getCachingModule(configuration),
        ContractModule.forRoot(configuration),
      ],
      providers: [DelegationService],
      exports: [DelegationService],
    }
  }
}
