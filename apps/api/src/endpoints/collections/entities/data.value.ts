import { Delegation } from '@mvx-monorepo/common/delegation'

export class DataValue {
  collection: string
  nonce: number
  content?: any

  constructor(collection: string, nonce: number, content?: any) {
    this.collection = collection
    this.nonce = nonce
    this.content = content
  }

  static fromDelegation(delegation: Delegation): DataValue {
    return new DataValue(delegation.collection, delegation.nonce, delegation.content)
  }
}
