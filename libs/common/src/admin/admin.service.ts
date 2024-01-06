import { Injectable } from '@nestjs/common'
import { ApiConfigService } from '../config'
import { UserSigner } from '@multiversx/sdk-wallet'
import { Account, Transaction } from '@multiversx/sdk-core'

@Injectable()
export class AdminService {
  public readonly signer: UserSigner
  public readonly account: Account

  constructor(
    private readonly apiConfigService: ApiConfigService,
  ) {
    this.signer = UserSigner.fromPem('####')
    this.account = new Account(this.signer.getAddress())
  }

  async signAndSend(tx: Transaction) {
    if (this.account.nonce === 0) {
      await this.syncAccount()
    }

    tx.setNonce(this.account.getNonceThenIncrement())
    await this.sign(tx)
    await this.apiConfigService.getNetworkProvider().sendTransaction(tx)
  }

  async syncAccount() {
    console.log(`Syncing admin wallet ...`)
    const signerAddress = this.signer.getAddress()
    const accountOnNetwork = await this.apiConfigService.getNetworkProvider().getAccount(signerAddress)
    this.account.update(accountOnNetwork)
  }

  async sign(tx: Transaction) {
    const serialized = tx.serializeForSigning()
    const signature: Buffer = await this.signer.sign(serialized)
    tx.applySignature(signature)

    return tx
  }
}
