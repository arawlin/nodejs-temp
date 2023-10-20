require('dotenv').config({ path: __dirname + '/.env' })
const db = require('./db')
const dbInitPost = require('./db/initPost')
const logger = require('./lib/logger')

const main = async (nameAPP) => {
  logger.init(nameAPP)
  await db.connect(dbInitPost)
}

main('app').then(() => logger.info('finish'))
