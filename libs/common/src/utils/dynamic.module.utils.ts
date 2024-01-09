import { DynamicModule, Provider } from '@nestjs/common'
import { ERDNEST_CONFIG_SERVICE } from '@multiversx/sdk-nestjs-common'
import { ApiModule, ApiModuleOptions } from '@multiversx/sdk-nestjs-http'
import { ElasticModule, ElasticModuleOptions } from '@multiversx/sdk-nestjs-elastic'
import { CacheModule, RedisCacheModuleOptions } from '@multiversx/sdk-nestjs-cache'
import { ClientOptions, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { AppConfigModule, AppConfigService, SdkNestjsConfigServiceImpl } from '../config'

export class DynamicModuleUtils {
  static getElasticModule(config: () => any): DynamicModule {
    return ElasticModule.forRootAsync({
      imports: [AppConfigModule.forRoot(config)],
      useFactory: (appConfigService: AppConfigService) =>
        new ElasticModuleOptions({
          url: appConfigService.elasticUrl,
          customValuePrefix: 'api',
        }),
      inject: [AppConfigService],
    })
  }

  static getCachingModule(config: () => any): DynamicModule {
    return CacheModule.forRootAsync({
      imports: [AppConfigModule.forRoot(config)],
      useFactory: (appConfigService: AppConfigService) =>
        new RedisCacheModuleOptions(
          {
            host: appConfigService.redisUrl,
            port: appConfigService.redisPort,
          },
          {
            poolLimit: appConfigService.poolLimit,
            processTtl: appConfigService.processTtl,
          }
        ),
      inject: [AppConfigService],
    })
  }

  static getApiModule(config: () => any): DynamicModule {
    return ApiModule.forRootAsync({
      imports: [AppConfigModule.forRoot(config)],
      useFactory: (appConfigService: AppConfigService) =>
        new ApiModuleOptions({
          axiosTimeout: appConfigService.axiosTimeout,
          rateLimiterSecret: appConfigService.rateLimiterSecret,
          serverTimeout: appConfigService.serverTimeout,
          useKeepAliveAgent: appConfigService.useKeepAliveAgentFlag,
        }),
      inject: [AppConfigService],
    })
  }

  static getNestJsApiConfigService(): Provider {
    return {
      provide: ERDNEST_CONFIG_SERVICE,
      useClass: SdkNestjsConfigServiceImpl,
    }
  }

  static getPubSubService(): Provider {
    return {
      provide: 'PUBSUB_SERVICE',
      useFactory: (appConfigService: AppConfigService) => {
        const clientOptions: ClientOptions = {
          transport: Transport.REDIS,
          options: {
            host: appConfigService.redisUrl,
            port: 6379,
            retryDelay: 1000,
            retryAttempts: 10,
            retryStrategy: () => 1000,
          },
        }

        return ClientProxyFactory.create(clientOptions)
      },
      inject: [AppConfigService],
    }
  }
}
