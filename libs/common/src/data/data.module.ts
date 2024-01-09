import { Module } from '@nestjs/common'
import { DataService } from './data.service'
import { AppConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'

@Module({})
export class DataModule {
  static forRoot(config: () => any) {
    return {
      module: DataModule,
      imports: [AppConfigModule.forRoot(config), DynamicModuleUtils.getCachingModule(config)],
      providers: [DataService],
      exports: [DataService],
    }
  }
}
