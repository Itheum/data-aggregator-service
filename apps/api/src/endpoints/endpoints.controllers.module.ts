import { Module } from '@nestjs/common'
import { AuthController } from './auth/auth.controller'
import configuration from '../../../api/config/configuration'
import { EndpointsServicesModule } from './endpoints.services.module'
import { CollectionsController } from './collections/collections.controller'
import {
  AppService,
  ContractService,
  ApiConfigModule,
  DelegationService,
  DynamicModuleUtils,
  HealthCheckController,
} from '@mvx-monorepo/common'

@Module({
  imports: [EndpointsServicesModule, ApiConfigModule.forRoot(configuration), DynamicModuleUtils.getCachingModule(configuration)],
  providers: [DynamicModuleUtils.getNestJsApiConfigService(), AppService, DelegationService, ContractService],
  controllers: [AuthController, HealthCheckController, CollectionsController],
})
export class EndpointsControllersModule {}
