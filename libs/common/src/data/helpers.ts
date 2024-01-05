import { Delegation } from '../delegation'
import { DataNft } from '@itheum/sdk-mx-data-nft'

export const createDataNftsFromDelegations = async (delegations: Delegation[]) =>
  await DataNft.createManyFromApi(delegations.map((d) => ({ tokenIdentifier: d.collection, nonce: d.nonce })))
