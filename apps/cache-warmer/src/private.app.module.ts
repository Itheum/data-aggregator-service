import { Module } from '@nestjs/common'
import { config } from 'apps/cache-warmer/config'
import { ApiMetricsModule } from '@mvx-monorepo/common'
import { LoggingModule } from '@multiversx/sdk-nestjs-common'
import { AppConfigModule, ApiMetricsController, HealthCheckController } from '@mvx-monorepo/common'

@Module({
  imports: [LoggingModule, ApiMetricsModule, AppConfigModule.forRoot(config)],
  providers: [],
  controllers: [ApiMetricsController, HealthCheckController],
})
export class PrivateAppModule {}
