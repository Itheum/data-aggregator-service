import { Constants } from '@multiversx/sdk-nestjs-common'

export class CollectionValue {
  value?: string
  ttl: number = Constants.oneSecond() * 6
}
