import { Module } from '@nestjs/common'
import configuration from '../config/configuration'
import { LoggingModule } from '@multiversx/sdk-nestjs-common'
import { CacheController } from './endpoints/caching/cache.controller'
import { ApiMetricsModule, DynamicModuleUtils } from '@mvx-monorepo/common'
import { ApiMetricsController, HealthCheckController } from '@mvx-monorepo/common'

@Module({
  imports: [LoggingModule, ApiMetricsModule, DynamicModuleUtils.getCachingModule(configuration)],
  providers: [DynamicModuleUtils.getNestJsApiConfigService(), DynamicModuleUtils.getPubSubService()],
  controllers: [ApiMetricsController, CacheController, HealthCheckController],
})
export class PrivateAppModule {}
