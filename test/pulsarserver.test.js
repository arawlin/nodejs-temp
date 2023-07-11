const Pulsar = require('pulsar-client')

const logger = require('../lib/logger')
logger.init('pulsar', true)
const log = logger.getLogger('client')

const main = async () => {
  const client = new Pulsar.Client({
    serviceUrl: process.env.uriMQ,
  })

  const consumer = await client.subscribe({
    topic: 'my-topic',
    subscription: 'my-subscription',
  })

  while (true) {
    const msg = await consumer.receive()
    log.info(msg.getData().toString(), '\n')

    consumer.acknowledge(msg)
  }

  await consumer.close()

  await client.close()
}

main().then(() => log.warn('finish'))
