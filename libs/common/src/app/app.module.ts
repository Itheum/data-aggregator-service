import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { AppConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'
import { ContractModule } from '@mvx-monorepo/common/contract/contract.module'

@Module({})
export class AppModule {
  static forRoot(config: () => any) {
    return {
      module: AppModule,
      imports: [AppConfigModule.forRoot(config), DynamicModuleUtils.getCachingModule(config), ContractModule.forRoot(config)],
      providers: [AppService],
      exports: [AppService],
    }
  }
}
