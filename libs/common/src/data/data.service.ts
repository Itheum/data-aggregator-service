import { Injectable } from '@nestjs/common'
import { CacheService } from '@multiversx/sdk-nestjs-cache'

@Injectable()
export class DataService {
  constructor(protected readonly cachingService: CacheService) {}

  async mintStreamNft() {
    // const dataNfts = DataNft.createManyFromApi()
    // const tx = await dataNftMinter.mint(
    //   this.adminService.getAccount(network).address,
    //   'Portable Data #1',
    //   'https://api.itheumcloud-stg.com/datamarshalapi/achilles/v1',
    //   'https://peerme.io/explore',
    //   'https://peerme.io/',
    //   5,
    //   1,
    //   'Valuable Data',
    //   'This is some valuable stuff here',
    //   500 * 10 ** 18
    // )
    // await this.adminService.signAndSend(tx as any, network)
    // console.log(`Minted DataNFT on ${network} with tx: ${tx.getHash().toString()}`)
  }
}
