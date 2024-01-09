import { AppInfo } from '../app'
import { Constants } from '@multiversx/sdk-nestjs-common'

export class CacheInfo {
  key: string = ''
  ttl: number = Constants.oneSecond() * 6

  static Apps(): CacheInfo {
    return {
      key: this.toScopedKey('apps'),
      ttl: Constants.oneMonth() * 12,
    }
  }

  static AppDelegations(app: AppInfo): CacheInfo {
    return {
      key: this.toScopedKey(`appDelegations:${app.id}`),
      ttl: Constants.oneMonth() * 12,
    }
  }

  static LastProcessedNonce(shardId: number): CacheInfo {
    return {
      key: this.toScopedKey(`lastProcessedNonce:${shardId}`),
      ttl: Constants.oneMonth(),
    }
  }

  private static toScopedKey(name: string): string {
    const appName = process.env.APP_NAME || 'multiversx'
    const appEnv = process.env.APP_ENV || 'dev'

    return `cache:${appName}:${appEnv}:${name}`
  }
}
