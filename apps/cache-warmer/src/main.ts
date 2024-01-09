import 'module-alias/register'
import { NestFactory } from '@nestjs/core'
import { CacheWarmerModule } from './cache-warmer'
import { config } from 'apps/cache-warmer/config'
import { PrivateAppModule } from './private.app.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppConfigService, PubSubListenerModule } from '@mvx-monorepo/common'

async function bootstrap() {
  const cacheWarmerApp = await NestFactory.create(CacheWarmerModule)
  const appConfigService = cacheWarmerApp.get<AppConfigService>(AppConfigService)
  await cacheWarmerApp.listen(appConfigService.cacheWarmerFeaturePort)

  if (appConfigService.isPrivateApiFeatureActive) {
    const privateApp = await NestFactory.create(PrivateAppModule)
    await privateApp.listen(appConfigService.privateApiFeaturePort)
  }

  const pubSubApp = await NestFactory.createMicroservice<MicroserviceOptions>(PubSubListenerModule.forRoot(config), {
    transport: Transport.REDIS,
    options: {
      host: appConfigService.redisUrl,
      port: 6379,
      retryAttempts: 100,
      retryDelay: 1000,
      retryStrategy: () => 1000,
    },
  })
  pubSubApp.useLogger(pubSubApp.get(WINSTON_MODULE_NEST_PROVIDER))
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  pubSubApp.listen()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
