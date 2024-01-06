import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'
import { ContractModule } from '@mvx-monorepo/common/contract/contract.module'

@Module({})
export class AppModule {
  static forRoot(configuration: () => Record<string, any>) {
    return {
      module: AppModule,
      imports: [
        ApiConfigModule.forRoot(configuration),
        DynamicModuleUtils.getCachingModule(configuration),
        ContractModule.forRoot(configuration),
      ],
      providers: [AppService],
      exports: [AppService],
    }
  }
}
