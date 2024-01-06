import { AppInfo } from '../app'
import { Constants } from '@multiversx/sdk-nestjs-common'

export class CacheInfo {
  key: string = ''
  ttl: number = Constants.oneSecond() * 6

  static Apps(): CacheInfo {
    return {
      key: 'apps',
      ttl: Constants.oneMonth() * 12,
    }
  }

  static AppDelegations(app: AppInfo): CacheInfo {
    return {
      key: `appDelegations:${app.id}`,
      ttl: Constants.oneMonth() * 12,
    }
  }

  static LastProcessedNonce(shardId: number): CacheInfo {
    return {
      key: `lastProcessedNonce:${shardId}`,
      ttl: Constants.oneMonth(),
    }
  }
}
