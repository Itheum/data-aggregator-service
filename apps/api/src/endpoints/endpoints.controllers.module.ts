import { Module } from '@nestjs/common'
import { config } from 'apps/api/config'
import { AuthController } from './auth/auth.controller'
import { EndpointsServicesModule } from './endpoints.services.module'
import { CollectionsController } from './collections/collections.controller'
import { AppService, ContractService, DelegationService, DynamicModuleUtils, HealthCheckController } from '@mvx-monorepo/common'

@Module({
  imports: [EndpointsServicesModule, DynamicModuleUtils.getCachingModule(config)],
  providers: [DynamicModuleUtils.getNestJsApiConfigService(), AppService, DelegationService, ContractService],
  controllers: [AuthController, HealthCheckController, CollectionsController],
})
export class EndpointsControllersModule {}
