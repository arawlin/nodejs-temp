require('dotenv').config()

const Pulsar = require('pulsar-client')

const logger = require('../lib/logger')
logger.init('pulsar', true)
const log = logger.getLogger('client')

const main = async () => {
  const client = new Pulsar.Client({
    serviceUrl: process.env.uriMQ,
  })

  const producer = await client.createProducer({
    topic: 'my-topic', // or 'my-tenant/my-namespace/my-topic' to specify topic's tenant and namespace
  })

  await producer.send({
    data: Buffer.from('Hello, Pulsar'),
  })

  for (let i = 0; i < 10; i += 1) {
    const msg = `my-message-${i}`
    producer.send({
      data: Buffer.from(msg),
    })
    console.log(`Sent message: ${msg}`)
  }
  await producer.flush()

  await producer.close()

  await client.close()
}

main().then(() => log.warn('finish'))
