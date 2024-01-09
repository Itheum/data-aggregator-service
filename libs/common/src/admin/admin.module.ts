import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AppConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'

@Module({})
export class AdminModule {
  static forRoot(config: () => any) {
    return {
      module: AdminModule,
      imports: [AppConfigModule.forRoot(config), DynamicModuleUtils.getCachingModule(config)],
      providers: [AdminService],
      exports: [AdminService],
    }
  }
}
