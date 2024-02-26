export const config = () => ({
  app: {
    name: process.env.APP_NAME || 'aggregator',
    env: process.env.APP_ENV || 'mainnet',
  },
  features: {
    cacheWarmer: {
      enabled: process.env.CACHE_WARMER_ENABLED !== 'false',
      port: 5201,
    },
    privateApi: {
      enabled: process.env.PRIVATE_API_ENABLED !== 'false',
      port: 4000,
    },
  },
  contracts: {
    aggregator: process.env.CONTRACT_AGGREGATOR || '####',
  },
  services: {
    chain: {
      apiUrl: process.env.CHAIN_API_URL || 'https://api.multiversx.com',
      nativeAuth: {
        acceptedOrigins: ['https://utils.multiversx.com'],
      },
    },
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
  },
})
