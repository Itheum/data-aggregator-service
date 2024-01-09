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
      url: process.env.REDIS_URL || '127.0.0.1',
    },
  },
})
