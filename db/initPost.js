const db = require('./index')
const dbTemp = require('./dbTemp')

const main = async () => {
  await db.createIndexes(dbTemp.NAME_COLL, dbTemp.indexs)
}

module.exports = main
