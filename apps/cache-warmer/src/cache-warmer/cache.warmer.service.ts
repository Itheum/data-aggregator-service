import { Injectable } from '@nestjs/common'
import { AppService } from '@mvx-monorepo/common/app'
import { Cron, CronExpression } from '@nestjs/schedule'
import { DelegationService } from '@mvx-monorepo/common/delegation'

@Injectable()
export class CacheWarmerService {
  constructor(
    private readonly appService: AppService,
    private readonly delegationService: DelegationService
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async syncApps() {
    await this.appService.syncApps()
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async syncDelegations() {
    const apps = await this.appService.getApps()

    apps.forEach(async (app) => {
      await this.delegationService.syncDelegations(app)
    })
  }
}
