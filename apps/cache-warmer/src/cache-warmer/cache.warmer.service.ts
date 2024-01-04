import { Injectable } from '@nestjs/common'
import { AppService } from '@mvx-monorepo/common/app'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class CacheWarmerService {
  constructor(private readonly appService: AppService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async syncApps() {
    await this.appService.syncApps()
  }
}
