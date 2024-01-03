import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { NativeAuthGuard, NativeAuth } from '@multiversx/sdk-nestjs-auth'

@Controller()
@ApiTags('auth')
export class AuthController {
  @Get('/auth')
  @UseGuards(NativeAuthGuard)
  @ApiResponse({ status: 200, description: 'Authorizes the user and returns the encoded address' })
  authorize(@NativeAuth('address') address: string): string {
    return address
  }
}
