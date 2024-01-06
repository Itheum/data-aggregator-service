import { Delegation } from '@mvx-monorepo/common/delegation'

export class DataValue {
  collection: string
  nonce: number

  constructor(collection: string, nonce: number) {
    this.collection = collection
    this.nonce = nonce
  }

  static fromDelegation(delegation: Delegation): DataValue {
    return new DataValue(delegation.collection, delegation.nonce)
  }
}
