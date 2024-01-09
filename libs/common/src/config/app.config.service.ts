import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers'

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get apiUrl(): string {
    return this.configService.getOrThrow<string>('services.chain.apiUrl')
  }

  get networkProvider(): ApiNetworkProvider {
    return new ApiNetworkProvider(this.apiUrl, {
      timeout: this.axiosTimeout,
    })
  }

  get swaggerUrls(): string[] {
    return this.configService.getOrThrow<string[]>('services.swagger.urls')
  }

  get redisUrl(): string {
    return this.configService.getOrThrow<string>('services.redis.url')
  }

  get redisHost(): string {
    return this.redisUrl.split(':')[0]
  }

  get redisPort(): number {
    const components = this.redisUrl.split(':')

    if (components.length > 1) {
      return Number(components[1])
    }

    return 6379
  }

  get isPublicApiFeatureActive(): boolean {
    return this.configService.getOrThrow<boolean>('features.publicApi.enabled')
  }

  get publicApiFeaturePort(): number {
    return this.configService.getOrThrow<number>('features.publicApi.port')
  }

  get isPrivateApiFeatureActive(): boolean {
    return this.configService.getOrThrow<boolean>('features.privateApi.enabled')
  }

  get privateApiFeaturePort(): number {
    return this.configService.getOrThrow<number>('features.privateApi.port')
  }

  get isCacheWarmerFeatureActive(): boolean {
    return this.configService.getOrThrow<boolean>('features.cacheWarmer.enabled')
  }

  get cacheWarmerFeaturePort(): number {
    return this.configService.getOrThrow<number>('features.cacheWarmer.port')
  }

  get isTransactionProcessorFeatureActive(): boolean {
    return this.configService.getOrThrow<boolean>('features.transactionProcessor.enabled')
  }

  get transactionProcessorFeaturePort(): number {
    return this.configService.getOrThrow<number>('features.transactionProcessor.port')
  }

  get transactionProcessorMaxLookBehind(): number {
    return this.configService.getOrThrow<number>('features.transactionProcessor.maxLookBehind')
  }

  get isQueueWorkerFeatureActive(): boolean {
    return this.configService.getOrThrow<boolean>('features.queueWorker.enabled')
  }

  get queueWorkerFeaturePort(): number {
    return this.configService.getOrThrow<number>('features.queueWorker.port')
  }

  get securityAdmins(): string[] {
    return this.configService.getOrThrow<string[]>('security.admins')
  }

  get rateLimiterSecret(): string | undefined {
    return this.configService.get<string>('rateLimiterSecret')
  }

  get axiosTimeout(): number {
    return this.configService.get<number>('keepAliveTimeout.downstream') ?? 61000
  }

  get isKeepAliveAgentFeatureActive(): boolean {
    return this.configService.get<boolean>('keepAliveAgent.enabled') ?? true
  }

  get serverTimeout(): number {
    return this.configService.get<number>('keepAliveTimeout.upstream') ?? 60000
  }

  get headersTimeout(): number {
    return this.serverTimeout + 1000
  }

  get useCachingInterceptor(): boolean {
    return this.configService.get<boolean>('useCachingInterceptor') ?? false
  }

  get elasticUrl(): string {
    const elasticUrls = this.configService.getOrThrow<string[]>('urls.elastic')

    return elasticUrls[Math.floor(Math.random() * elasticUrls.length)]
  }

  get poolLimit(): number {
    return this.configService.get<number>('caching.poolLimit') ?? 100
  }

  get processTtl(): number {
    return this.configService.get<number>('caching.processTtl') ?? 60
  }

  get useKeepAliveAgentFlag(): boolean {
    return this.configService.get<boolean>('flags.useKeepAliveAgent') ?? true
  }

  get isAuthActive(): boolean {
    return this.configService.get<boolean>('api.auth') ?? false
  }

  get nativeAuthMaxExpirySeconds(): number {
    return this.configService.get<number>('services.chain.nativeAuth.maxExpirySeconds') ?? 86400
  }

  get nativeAuthAcceptedOrigins(): string[] {
    return this.configService.get<string[]>('services.chain.nativeAuth.acceptedOrigins') ?? []
  }

  get aggregatorContractAddress(): string {
    return this.configService.getOrThrow<string>('contracts.aggregator')
  }
}
