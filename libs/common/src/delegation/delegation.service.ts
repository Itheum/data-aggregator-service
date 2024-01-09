import { AppInfo } from '../app'
import { CacheInfo } from '../utils'
import { Delegation } from './types'
import { ContractService } from '../contract'
import { Injectable, Logger } from '@nestjs/common'
import { CacheService } from '@multiversx/sdk-nestjs-cache'

@Injectable()
export class DelegationService {
  private logger: Logger

  constructor(
    private readonly contractService: ContractService,
    private readonly cacheService: CacheService
  ) {
    this.logger = new Logger(DelegationService.name)
  }

  async syncDelegations(app: AppInfo) {
    const delegations = await this.contractService.getAppDelegations(app.id)

    const cacheInfo = CacheInfo.AppDelegations(app)
    await this.cacheService.set(cacheInfo.key, delegations, cacheInfo.ttl)

    this.logger.log(`Synced ${delegations.length} delegations for app ${app.id}`)
  }

  async getDelegations(app: AppInfo): Promise<Delegation[]> {
    const cacheInfo = CacheInfo.AppDelegations(app)
    const delegations = await this.cacheService.get<Delegation[]>(cacheInfo.key)

    return delegations || []
  }

  async getDelegationsBySegment(app: AppInfo, segment: string): Promise<Delegation[]> {
    const cacheInfo = CacheInfo.AppDelegations(app)
    const delegations = await this.cacheService.get<Delegation[]>(cacheInfo.key)
    const filtered = delegations?.filter((del) => del.segment === segment) || []

    return filtered
  }
}
