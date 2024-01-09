export const config = () => ({
  features: {
    queueWorker: {
      enabled: process.env.QUEUE_WORKER_ENABLED !== 'false',
      port: 5201,
    },
    privateApi: {
      enabled: process.env.PRIVATE_API_ENABLED !== 'false',
      port: 4000,
    },
  },
  services: {
    redis: {
      url: process.env.REDIS_URL || '127.0.0.1',
    },
  },
})
