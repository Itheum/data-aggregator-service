export const config = () => ({
  app: {
    name: process.env.APP_NAME || 'aggregator',
    env: process.env.APP_ENV || 'mainnet',
  },
  features: {
    transactionProcessor: {
      enabled: process.env.TX_PROCESSOR_ENABLED !== 'false',
      port: 8000,
      maxLookBehind: 100,
    },
    privateApi: {
      enabled: process.env.PRIVATE_API_ENABLED !== 'false',
      port: 4000,
    },
  },
  services: {
    chain: {
      apiUrl: process.env.CHAIN_API_URL || 'https://api.multiversx.com',
    },
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
  },
})
