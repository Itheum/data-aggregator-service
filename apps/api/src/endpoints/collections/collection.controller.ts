import { ApiResponse } from '@nestjs/swagger'
import { Controller, Get, Param } from '@nestjs/common'

@Controller()
export class CollectionsController {
  constructor() {}

  // TODO: @UseGuards(NativeAuthGuard)
  @Get('/collections')
  @ApiResponse({ status: 200 })
  async index(@Param('collection') key: string): Promise<unknown> {
    return JSON.stringify({
      collection: key,
    })
  }

  // TODO: @UseGuards(NativeAuthGuard)
  @Get('/collections/:collection')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  async show(@Param('collection') key: string): Promise<unknown> {
    return {
      collection: key,
    }
  }
}
