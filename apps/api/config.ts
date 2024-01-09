export const config = () => ({
  app: {
    name: process.env.APP_NAME || 'aggregator',
    env: process.env.APP_ENV || 'mainnet',
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
  services: {
    swagger: {
      urls: [process.env.SWAGGER_URL || 'https://aggregator.example.com'],
    },
    chain: {
      apiUrl: process.env.CHAIN_API_URL || 'https://api.multiversx.com',
      nativeAuth: {
        acceptedOrigins: ['https://utils.multiversx.com'],
      },
    },
    redis: {
      url: process.env.REDIS_URL || '127.0.0.1',
    },
  },
})
