export const config = () => ({
  app: {
    name: process.env.APP_NAME || 'aggregator',
    env: process.env.APP_ENV || 'mainnet',
    url: process.env.APP_DOMAIN || 'https://itheum.io',
  },
  features: {
    publicApi: {
      enabled: process.env.PUBLIC_API !== 'false',
      port: parseInt(process.env.PRIVATE_API_PORT || process.env.PORT || '3000'),
    },
    privateApi: {
      enabled: process.env.PRIVATE_API !== 'false',
      port: parseInt(process.env.PRIVATE_API_PORT || '4000'),
    },
  },
  contracts: {
    aggregator: process.env.CONTRACT_AGGREGATOR || '####',
  },
  services: {
    swagger: {
      urls: [process.env.SWAGGER_URL || 'https://aggregator.example.com'],
    },
    chain: {
      apiUrl: process.env.CHAIN_API_URL || 'https://api.multiversx.com',
      wallet: {
        admin: process.env.WALLET_ADMIN_PEM || '####',
      },
      nativeAuth: {
        maxExpirySeconds: 3600,
        acceptedOrigins: ['https://itheum.io', 'https://utils.multiversx.com'],
      },
    },
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
  },
})
