import { ApiResponse } from '@nestjs/swagger'
import { AppService } from '@mvx-monorepo/common'
import { DataValue } from './entities/data.value'
import { DelegationService } from '@mvx-monorepo/common/delegation'
import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

@Controller()
export class CollectionsController {
  constructor(
    private readonly appService: AppService,
    private readonly delegationService: DelegationService
  ) {}

  // TODO: @UseGuards(NativeAuthGuard)
  @Get('/collections')
  @ApiResponse({ status: 200 })
  index(@Param('collection') key: string) {
    return JSON.stringify({
      collection: key,
    })
  }

  // TODO: @UseGuards(NativeAuthGuard)
  @Get('apps/:appid/collections/:collection')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  async show(@Param('appid') appId: string, @Param('collection') key: string) {
    const app = await this.appService.getAppById(+appId)

    if (!app) {
      throw new NotFoundException('App not found')
    }

    const delegations = key
      ? await this.delegationService.getDelegationsBySegment(app, key)
      : await this.delegationService.getDelegations(app)

    const values = delegations.map((del) => DataValue.fromDelegation(del))

    return values
  }
}
