import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { ApiConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'

@Module({})
export class AdminModule {
  static forRoot(configuration: () => Record<string, any>) {
    return {
      module: AdminModule,
      imports: [ApiConfigModule.forRoot(configuration), DynamicModuleUtils.getCachingModule(configuration)],
      providers: [AdminService],
      exports: [AdminService],
    }
  }
}
