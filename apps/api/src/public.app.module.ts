import { Module, NestModule } from '@nestjs/common'
import { DynamicModuleUtils } from '@mvx-monorepo/common'
import { LoggingModule } from '@multiversx/sdk-nestjs-common'
import { EndpointsServicesModule } from './endpoints/endpoints.services.module'
import { EndpointsControllersModule } from './endpoints/endpoints.controllers.module'

@Module({
  imports: [LoggingModule, EndpointsServicesModule, EndpointsControllersModule],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
  exports: [EndpointsServicesModule],
})
export class PublicAppModule implements NestModule {
  configure() {}
}
