import { CacheInfo } from '../utils'
import { Delegation } from './types'
import { Injectable } from '@nestjs/common'
import { ApiConfigService } from '../config'
import { DataNft } from '@itheum/sdk-mx-data-nft'
import { CacheService } from '@multiversx/sdk-nestjs-cache'
import { toTypedAppInfo, toTypedDelegation } from './helpers'
import * as aggregatorAbiJson from './data-aggregator.abi.json'
import { createDataNftsFromDelegations } from '../data/helpers'
import { AbiRegistry, Address, ResultsParser, SmartContract } from '@multiversx/sdk-core'

@Injectable()
export class ContractService {
  constructor(
    private readonly apiConfigService: ApiConfigService,
    protected readonly cachingService: CacheService
  ) {}

  async getApps() {
    const data = await this.queryContract('getApps', [])
    const apps = data.map(toTypedAppInfo)

    const cacheInfo = CacheInfo.Apps()
    this.cachingService.set(cacheInfo.key, apps, cacheInfo.ttl)

    console.log('apps', await this.cachingService.get(cacheInfo.key))
  }

  async getAppDelegations(appId: number) {
    const data = await this.queryContract('getDelegations', [appId])
    const delegations: Delegation[] = data.map(toTypedDelegation)

    const cacheInfo = CacheInfo.AppDelegations(appId)
    this.cachingService.set(cacheInfo.key, delegations, cacheInfo.ttl)

    DataNft.setNetworkConfig('devnet')

    const dataNfts = await createDataNftsFromDelegations(delegations)

    // console.log('app delegations', await this.cachingService.get(cacheInfo.key))
    console.log('app delegations', dataNfts)
  }

  private async queryContract(endpoint: string, args: any[]) {
    const abi = AbiRegistry.create(aggregatorAbiJson)

    const contractAddress = new Address(this.apiConfigService.getAggregatorContract())
    const contract = new SmartContract({ address: contractAddress, abi })
    const interaction = contract.methods[endpoint](args)
    const res = await this.apiConfigService.getNetworkProvider().queryContract(interaction.buildQuery())
    const parsed = new ResultsParser().parseQueryResponse(res, interaction.getEndpoint())

    return parsed.firstValue?.valueOf()
  }
}
