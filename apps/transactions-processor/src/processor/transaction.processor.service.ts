import { Cron } from '@nestjs/schedule'
import { Injectable, Logger } from '@nestjs/common'
import { Locker } from '@multiversx/sdk-nestjs-common'
import { CacheService } from '@multiversx/sdk-nestjs-cache'
import { ApiConfigService, CacheInfo } from '@mvx-monorepo/common'
import { TransactionProcessor } from '@multiversx/sdk-transaction-processor'

@Injectable()
export class TransactionProcessorService {
  private transactionProcessor: TransactionProcessor = new TransactionProcessor()
  private readonly logger: Logger

  constructor(
    private readonly apiConfigService: ApiConfigService,
    private readonly cacheService: CacheService
  ) {
    this.logger = new Logger(TransactionProcessorService.name)
  }

  @Cron('*/1 * * * * *')
  async handleNewTransactions() {
    await Locker.lock('newTransactions', async () => {
      await this.transactionProcessor.start({
        gatewayUrl: this.apiConfigService.getApiUrl(),
        maxLookBehind: this.apiConfigService.getTransactionProcessorMaxLookBehind(),
        onTransactionsReceived: async (shardId, nonce, transactions, statistics) => {
          this.logger.log(
            `Received ${transactions.length} transactions on shard ${shardId} and nonce ${nonce}. Time left: ${statistics.secondsLeft}`
          )
        },
        getLastProcessedNonce: async (shardId) => {
          return await this.cacheService.getRemote(CacheInfo.LastProcessedNonce(shardId).key)
        },
        setLastProcessedNonce: async (shardId, nonce) => {
          await this.cacheService.setRemote(CacheInfo.LastProcessedNonce(shardId).key, nonce, CacheInfo.LastProcessedNonce(shardId).ttl)
        },
      })
    })
  }
}
