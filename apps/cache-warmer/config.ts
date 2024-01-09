export const config = () => ({
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
    redis: {
      url: process.env.REDIS_URL || '127.0.0.1',
    },
  },
})
