import { Module } from '@nestjs/common'
import { ContractService } from './contract.service'
import { ApiConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'

@Module({})
export class ContractModule {
  static forRoot(configuration: () => Record<string, any>) {
    return {
      module: ContractModule,
      imports: [ApiConfigModule.forRoot(configuration), DynamicModuleUtils.getCachingModule(configuration)],
      providers: [ContractService],
      exports: [ContractService],
    }
  }
}
