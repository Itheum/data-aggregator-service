export type AppInfo = {
  name: string
  manager: string
  createdAt: number
  dataCollections: string[]
}

export type Delegation = {
  collection: string
  nonce: number
  segment: string
}
