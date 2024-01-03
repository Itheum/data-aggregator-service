import { Module } from '@nestjs/common'
import { AuthController } from './auth/auth.controller'
import { DynamicModuleUtils } from '@mvx-monorepo/common'
import { HealthCheckController } from '@mvx-monorepo/common'
import { EndpointsServicesModule } from './endpoints.services.module'

@Module({
  imports: [EndpointsServicesModule],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
  controllers: [AuthController, HealthCheckController],
})
export class EndpointsControllersModule {}
