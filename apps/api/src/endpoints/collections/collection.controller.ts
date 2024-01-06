import { ApiResponse } from '@nestjs/swagger'
import { CacheService } from '@multiversx/sdk-nestjs-cache'
import { NativeAuthAdminGuard, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth'
import { Controller, Get, HttpException, HttpStatus, Param, Query, UseGuards } from '@nestjs/common'

@Controller()
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @Get('/caching/:key')
  @ApiResponse({ status: 200, description: 'The cache value for one key', type: String })
  @ApiResponse({ status: 404, description: 'Key not found' })
  async getCache(@Param('key') key: string): Promise<unknown> {
    const value = await this.cacheService.getRemote(key)
    if (!value) {
      throw new HttpException('Key not found', HttpStatus.NOT_FOUND)
    }
    return JSON.stringify(value)
  }

  @UseGuards(NativeAuthGuard, NativeAuthAdminGuard)
  @Get('/caching')
  async getKeys(@Query('keys') keys: string): Promise<string[]> {
    return await this.cacheService.getKeys(keys)
  }
}
