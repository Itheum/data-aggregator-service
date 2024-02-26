import { config } from 'apps/api/config'
import { Injectable } from '@nestjs/common'
import { AppConfigService } from '../config'
import { UserSigner } from '@multiversx/sdk-wallet'
import { Account, SignableMessage, Transaction } from '@multiversx/sdk-core'
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client'

@Injectable()
export class AdminService {
  public readonly signer: UserSigner
  public readonly account: Account

  constructor(private readonly appConfigService: AppConfigService) {
    this.signer = UserSigner.fromPem(config().services.chain.wallet.admin)
    this.account = new Account(this.signer.getAddress())
  }

  async signAndSend(tx: Transaction) {
    if (this.account.nonce === 0) {
      await this.syncAccount()
    }

    tx.setNonce(this.account.getNonceThenIncrement())
    await this.sign(tx)
    await this.appConfigService.networkProvider.sendTransaction(tx)
  }

  async syncAccount() {
    console.log(`Syncing admin wallet ...`)
    const signerAddress = this.signer.getAddress()
    const accountOnNetwork = await this.appConfigService.networkProvider.getAccount(signerAddress)
    this.account.update(accountOnNetwork)
  }

  async sign(tx: Transaction) {
    const serialized = tx.serializeForSigning()
    const signature: Buffer = await this.signer.sign(serialized)
    tx.applySignature(signature)

    return tx
  }

  async generateNativeAuthToken() {
    const client = new NativeAuthClient({
      apiUrl: config().services.chain.apiUrl,
      expirySeconds: config().services.chain.nativeAuth.maxExpirySeconds,
      origin: config().app.url,
    })

    const init = await client.initialize()
    const address = this.account.address.bech32()
    const signable = new SignableMessage({ message: Buffer.from(`${address}${init}`) })
    const signature = await this.signer.sign(signable.serializeForSigning())
    const signatureHex = signature.toString('hex')

    return client.getToken(address, init, signatureHex)
  }
}
