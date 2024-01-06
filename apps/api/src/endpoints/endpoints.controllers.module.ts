import { Module } from '@nestjs/common'
import { AuthController } from './auth/auth.controller'
import { HealthCheckController } from '@mvx-monorepo/common'
import configuration from '../../../api/config/configuration'
import { EndpointsServicesModule } from './endpoints.services.module'
import { ApiConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common'

@Module({
  imports: [EndpointsServicesModule, ApiConfigModule.forRoot(configuration), DynamicModuleUtils.getCachingModule(configuration)],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
  controllers: [AuthController, HealthCheckController],
})
export class EndpointsControllersModule {}
