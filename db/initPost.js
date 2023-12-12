const db = require('./index')
const dbTemp = require('./dbTemp')

const main = async () => {
  await dbTemp.init()
}

module.exports = main
