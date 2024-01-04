import { CacheInfo } from '../utils'
import { ContractService } from '../contract'
import { Injectable, LoggerService } from '@nestjs/common'
import { CacheService } from '@multiversx/sdk-nestjs-cache'

@Injectable()
export class AppService {
  constructor(
    private readonly contractService: ContractService,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService
  ) {}

  async syncApps() {
    const apps = await this.contractService.getApps()

    const cacheInfo = CacheInfo.Apps()
    this.cacheService.set(cacheInfo.key, apps, cacheInfo.ttl)

    this.logger.log(`Synced ${apps.length} apps`)
  }
}
