const db = require('./index')

const NAME_COLL = 'temp'

/*
metadata: {
  _id: { "$oid": "62ac460e219cf05efca174f6" },
}
*/

const indexs = [
  {
    key: { aa: 1 },
  },
  {
    key: { bb: 1, dd: 1 },
  },
  {
    key: { aa: 1, bb: 1 },
    unique: true,
  },
]

const find = async (fitler, options) => {
  return await db.find(NAME_COLL, fitler, options)
}

const count = async (filter) => {
  return await db.countDocuments(NAME_COLL, filter)
}
module.exports = {
  NAME_COLL,
  indexs,

  find,
  count,
}
