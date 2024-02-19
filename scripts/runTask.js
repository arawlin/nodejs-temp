require('dotenv').config()
const logger = require('../lib/logger').init()

const db = require('../db')
const dbInitPost = require('../db/initPost')

const tasks = require('../tasks')

const main = async () => {
  const args = process.argv.slice(2)
  logger.debug('args', args)
  if (!args || args.length === 0) {
    logger.error('args is empty')
    return
  }

  await db.connect(dbInitPost)
  await tasks.init(args[0])
}

main().then(() => logger.info('finish'))
