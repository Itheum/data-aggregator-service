import { DynamicModule, Module } from '@nestjs/common'
import { AppConfigModule } from '../config/app.config.module'
import { LoggingModule } from '@multiversx/sdk-nestjs-common'
import { PubSubListenerController } from './pub.sub.listener.controller'
import { DynamicModuleUtils } from '@mvx-monorepo/common/utils/dynamic.module.utils'

@Module({})
export class PubSubListenerModule {
  static forRoot(config: () => any): DynamicModule {
    return {
      module: PubSubListenerModule,
      imports: [LoggingModule, AppConfigModule, DynamicModuleUtils.getCachingModule(config)],
      controllers: [PubSubListenerController],
      providers: [DynamicModuleUtils.getPubSubService()],
      exports: ['PUBSUB_SERVICE'],
    }
  }
}
