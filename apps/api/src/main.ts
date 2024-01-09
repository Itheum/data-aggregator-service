import { join } from 'path'
import 'module-alias/register'
import { readFileSync } from 'fs'
import cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import { PublicAppModule } from './public.app.module'
import { PrivateAppModule } from './private.app.module'
import { Logger, NestInterceptor } from '@nestjs/common'
import { config } from 'apps/transactions-processor/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { PubSubListenerModule } from '@mvx-monorepo/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { NativeAuthGuard } from '@multiversx/sdk-nestjs-auth'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { LoggerInitializer } from '@multiversx/sdk-nestjs-common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { CacheService, CachingInterceptor } from '@multiversx/sdk-nestjs-cache'
import { AppConfigService, SdkNestjsConfigServiceImpl } from '@mvx-monorepo/common'
import { LoggingInterceptor, MetricsService } from '@multiversx/sdk-nestjs-monitoring'

import '@multiversx/sdk-nestjs-common/lib/utils/extensions/array.extensions'
import '@multiversx/sdk-nestjs-common/lib/utils/extensions/date.extensions'
import '@multiversx/sdk-nestjs-common/lib/utils/extensions/number.extensions'
import '@multiversx/sdk-nestjs-common/lib/utils/extensions/string.extensions'

async function bootstrap() {
  const publicApp = await NestFactory.create(PublicAppModule)
  publicApp.use(bodyParser.json({ limit: '1mb' }))
  publicApp.enableCors()
  publicApp.useLogger(publicApp.get(WINSTON_MODULE_NEST_PROVIDER))
  publicApp.use(cookieParser())

  const appConfigService = publicApp.get<AppConfigService>(AppConfigService)
  const cachingService = publicApp.get<CacheService>(CacheService)
  const metricsService = publicApp.get<MetricsService>(MetricsService)
  const httpAdapterHostService = publicApp.get<HttpAdapterHost>(HttpAdapterHost)

  if (appConfigService.isAuthActive) {
    publicApp.useGlobalGuards(new NativeAuthGuard(new SdkNestjsConfigServiceImpl(appConfigService), cachingService))
  }

  const httpServer = httpAdapterHostService.httpAdapter.getHttpServer()
  httpServer.keepAliveTimeout = appConfigService.serverTimeout
  httpServer.headersTimeout = appConfigService.headersTimeout //`keepAliveTimeout + server's expected response time`

  const globalInterceptors: NestInterceptor[] = []
  globalInterceptors.push(new LoggingInterceptor(metricsService))

  if (appConfigService.useCachingInterceptor) {
    const cachingInterceptor = new CachingInterceptor(cachingService, httpAdapterHostService, metricsService)

    globalInterceptors.push(cachingInterceptor)
  }

  publicApp.useGlobalInterceptors(...globalInterceptors)

  const description = readFileSync(join(__dirname, '..', 'docs', 'swagger.md'), 'utf8')

  let documentBuilder = new DocumentBuilder()
    .setTitle('MultiversX Microservice API')
    .setDescription(description)
    .setVersion('1.0.0')
    .setExternalDoc('MultiversX Docs', 'https://docs.multiversx.com')

  const apiUrls = appConfigService.swaggerUrls
  for (const apiUrl of apiUrls) {
    documentBuilder = documentBuilder.addServer(apiUrl)
  }

  const document = SwaggerModule.createDocument(publicApp, documentBuilder.build())
  SwaggerModule.setup('', publicApp, document)

  if (appConfigService.isPublicApiFeatureActive) {
    await publicApp.listen(appConfigService.publicApiFeaturePort)
  }

  if (appConfigService.isPrivateApiFeatureActive) {
    const privateApp = await NestFactory.create(PrivateAppModule)
    await privateApp.listen(appConfigService.privateApiFeaturePort)
  }

  const logger = new Logger('Bootstrapper')

  LoggerInitializer.initialize(logger)

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

  logger.log(`Public API active: ${appConfigService.isPublicApiFeatureActive}`)
  logger.log(`Private API active: ${appConfigService.isPrivateApiFeatureActive}`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
