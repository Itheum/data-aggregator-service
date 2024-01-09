import { ConfigModule } from '@nestjs/config'
import { Global, Module } from '@nestjs/common'
import { AppConfigService } from './app.config.service'

@Global()
@Module({})
export class AppConfigModule {
  static forRoot(config: () => any) {
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
      ],
      providers: [AppConfigService],
      exports: [AppConfigService],
    }
  }
}
