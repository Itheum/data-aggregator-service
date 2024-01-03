import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ContractService } from '@mvx-monorepo/common/contract/contract.service'

@Injectable()
export class CacheWarmerService {
  constructor(
    private readonly contractService: ContractService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async syncApps() {
    this.contractService.getAppDelegations(0)
  }
}
