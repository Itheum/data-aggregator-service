import 'module-alias/register'
import { NestFactory } from '@nestjs/core'
import { PrivateAppModule } from './private.app.module'
import { TransactionProcessorModule } from './processor'
import { config } from 'apps/transactions-processor/config'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppConfigService, PubSubListenerModule } from '@mvx-monorepo/common'

async function bootstrap() {
  const transactionProcessorApp = await NestFactory.create(TransactionProcessorModule)
  const appConfigService = transactionProcessorApp.get<AppConfigService>(AppConfigService)
  await transactionProcessorApp.listen(appConfigService.transactionProcessorFeaturePort)

  if (appConfigService.isPrivateApiFeatureActive) {
    const privateApp = await NestFactory.create(PrivateAppModule)
    await privateApp.listen(appConfigService.privateApiFeaturePort)
  }

  const pubSubApp = await NestFactory.createMicroservice<MicroserviceOptions>(PubSubListenerModule.forRoot(config), {
    transport: Transport.REDIS,
    options: {
      host: appConfigService.redisHost,
      port: appConfigService.redisPort,
      password: appConfigService.redisPassword || undefined,
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
