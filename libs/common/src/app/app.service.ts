import { AppInfo } from './types'
import { CacheInfo } from '../utils'
import { ContractService } from '../contract'
import { Injectable, Logger } from '@nestjs/common'
import { CacheService } from '@multiversx/sdk-nestjs-cache'

@Injectable()
export class AppService {
  private logger: Logger

  constructor(
    private readonly contractService: ContractService,
    private readonly cacheService: CacheService
  ) {
    this.logger = new Logger(AppService.name)
  }

  async syncApps() {
    const apps = await this.contractService.getApps()

    const cacheInfo = CacheInfo.Apps()
    this.cacheService.set(cacheInfo.key, apps, cacheInfo.ttl)

    this.logger.log(`Synced ${apps.length} apps`)
  }

  async getApps(): Promise<AppInfo[]> {
    const cacheInfo = CacheInfo.Apps()
    const apps = await this.cacheService.get<AppInfo[]>(cacheInfo.key)

    return apps || []
  }

  async getAppById(id: number): Promise<AppInfo | null> {
    const apps = await this.getApps()
    const app = apps.find((app) => app.id === id) || null

    return app
  }
}
