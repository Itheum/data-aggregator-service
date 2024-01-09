import { AppInfo } from '@mvx-monorepo/common'

export class AppValue {
  id: number
  name: string
  manager: string
  createdAt: number
  dataCollections: string[]

  constructor(id: number, name: string, manager: string, createdAt: number, dataCollections: string[]) {
    this.id = id
    this.name = name
    this.manager = manager
    this.createdAt = createdAt
    this.dataCollections = dataCollections
  }

  static fromAppInfo(info: AppInfo): AppValue {
    return new AppValue(info.id, info.name, info.manager, info.createdAt, info.dataCollections)
  }
}
