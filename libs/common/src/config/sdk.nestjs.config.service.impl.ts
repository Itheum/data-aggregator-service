import { Injectable } from '@nestjs/common'
import { AppConfigService } from './app.config.service'
import { ErdnestConfigService } from '@multiversx/sdk-nestjs-common'

@Injectable()
export class SdkNestjsConfigServiceImpl implements ErdnestConfigService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getSecurityAdmins(): string[] {
    return this.appConfigService.securityAdmins
  }

  getJwtSecret(): string {
    return '' // We use only NativeAuth in this template, so we don't need a JWT secret
  }

  getApiUrl(): string {
    return this.appConfigService.apiUrl
  }

  getNativeAuthMaxExpirySeconds(): number {
    return this.appConfigService.nativeAuthMaxExpirySeconds
  }

  getNativeAuthAcceptedOrigins(): string[] {
    return this.appConfigService.nativeAuthAcceptedOrigins
  }
}
