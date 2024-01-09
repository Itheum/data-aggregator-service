import { DynamicModuleUtils } from '@mvx-monorepo/common'
import { LoggingModule } from '@multiversx/sdk-nestjs-common'
import { AppIdMiddleware } from './middleware/app-id.middleware'
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { EndpointsServicesModule } from './endpoints/endpoints.services.module'
import { EndpointsControllersModule } from './endpoints/endpoints.controllers.module'
import { CollectionsController } from './endpoints/collections/collections.controller'

@Module({
  imports: [LoggingModule, EndpointsServicesModule, EndpointsControllersModule],
  providers: [DynamicModuleUtils.getNestJsApiConfigService()],
  exports: [EndpointsServicesModule],
})
export class PublicAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppIdMiddleware).forRoutes(CollectionsController)
  }
}
