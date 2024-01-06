import { AppInfo } from '../app'
import { Delegation } from '../delegation'

export const toTypedAppInfo = (value: any): AppInfo => ({
  id: value.id.toNumber(),
  name: value.name.toString(),
  manager: value.manager.toString(),
  createdAt: value.created_at.toNumber(),
  dataCollections: value.data_collections.map((v: any) => v.toString()),
})

export const toTypedDelegation = (value: any): Delegation => ({
  collection: value.collection.toString(),
  nonce: value.nonce.toNumber(),
  segment: value.segment.toString(),
})
