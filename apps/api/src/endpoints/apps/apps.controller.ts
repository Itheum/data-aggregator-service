import { ApiResponse } from '@nestjs/swagger'
import { AppService, DelegationService } from '@mvx-monorepo/common'
import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

@Controller()
export class AppsController {
  constructor(
    private readonly appService: AppService,
    private readonly delegationService: DelegationService
  ) {}

  // TODO: @UseGuards(NativeAuthGuard)
  @Get('/apps/sync')
  @ApiResponse({ status: 200 })
  async syncAll() {
    await this.appService.syncApps()
  }

  // TODO: @UseGuards(NativeAuthGuard)
  @Get('/apps/:appid/sync')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  async sync(@Param('appid') appId: string) {
    const app = await this.appService.getAppById(+appId)

    if (!app) {
      throw new NotFoundException('App not found')
    }

    await this.delegationService.syncDelegations(app)
  }
}
