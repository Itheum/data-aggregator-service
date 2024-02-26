import { AdminService } from '../admin'
import { config } from 'apps/api/config'
import { Delegation } from '../delegation'
import { Injectable } from '@nestjs/common'
import { DataNft } from '@itheum/sdk-mx-data-nft/out'
import { CacheService } from '@multiversx/sdk-nestjs-cache'

@Injectable()
export class DataService {
  constructor(
    protected readonly cachingService: CacheService,
    protected readonly adminServie: AdminService
  ) {
    DataNft.setNetworkConfig(config().app.env)
  }

  async unlockDelegationData(delegations: Delegation[]): Promise<Delegation[]> {
    const nativeAuthToken = await this.adminServie.generateNativeAuthToken()
    const unlockables = await DataNft.createManyFromApi(delegations.map((d) => ({ tokenIdentifier: d.collection, nonce: d.nonce })))

    const viewDataRequestOptions = this.getDataViewRequestOptions(nativeAuthToken)
    const unlocks = unlockables.map((u) => u.viewDataViaMVXNativeAuth(viewDataRequestOptions))
    const unlockResults = await Promise.all(unlocks)

    // TODO: add filtering based on status checks, and potentially trigger automatic undelegations

    const contentResults = await Promise.all(unlockResults.map((x) => x.data.text()))

    const unlockedDelegations = delegations.map((del, i) => {
      del.content = contentResults[i]
      return del
    })

    return unlockedDelegations
  }

  private getDataViewRequestOptions(nativeAuthToken: string) {
    return {
      mvxNativeAuthOrigins: config().services.chain.nativeAuth.acceptedOrigins,
      mvxNativeAuthMaxExpirySeconds: config().services.chain.nativeAuth.maxExpirySeconds,
      fwdHeaderMapLookup: {
        authorization: `Bearer ${nativeAuthToken}`,
      },
      asDeputyOnAppointerAddr: config().contracts.aggregator,
    }
  }
}
