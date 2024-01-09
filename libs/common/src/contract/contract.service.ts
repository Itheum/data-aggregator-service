import { AppInfo } from '../app'
import { Delegation } from '../delegation'
import { Injectable } from '@nestjs/common'
import { AppConfigService } from '../config'
import { CacheService } from '@multiversx/sdk-nestjs-cache'
import { toTypedAppInfo, toTypedDelegation } from './helpers'
import * as aggregatorAbiJson from './data-aggregator.abi.json'
import { AbiRegistry, Address, ResultsParser, SmartContract } from '@multiversx/sdk-core'

@Injectable()
export class ContractService {
  constructor(
    private readonly appConfigService: AppConfigService,
    protected readonly cacheService: CacheService
  ) {}

  async getApps() {
    const data = await this.queryContract('getApps', [])
    const apps: AppInfo[] = data.map(toTypedAppInfo)

    return apps
  }

  async getAppDelegations(appId: number) {
    const data = await this.queryContract('getDelegations', [appId])
    const delegations: Delegation[] = data.map(toTypedDelegation)

    return delegations
  }

  private async queryContract(endpoint: string, args: any[]) {
    const abi = AbiRegistry.create(aggregatorAbiJson)

    const contractAddress = new Address(this.appConfigService.aggregatorContractAddress)
    const contract = new SmartContract({ address: contractAddress, abi })
    const interaction = contract.methods[endpoint](args)
    const res = await this.appConfigService.networkProvider.queryContract(interaction.buildQuery())
    const parsed = new ResultsParser().parseQueryResponse(res, interaction.getEndpoint())

    return parsed.firstValue?.valueOf()
  }
}
