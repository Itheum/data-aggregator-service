import { Module } from '@nestjs/common'
import { DataService } from './data.service'
import { ApiConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'

@Module({})
export class DataModule {
  static forRoot(configuration: () => Record<string, any>) {
    return {
      module: DataModule,
      imports: [ApiConfigModule.forRoot(configuration), DynamicModuleUtils.getCachingModule(configuration)],
      providers: [DataService],
      exports: [DataService],
    }
  }
}
