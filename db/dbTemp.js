const db = require('./index')
const DBBase = require('./dbBase')

/*
metadata: {
  _id: { "$oid": "62ac460e219cf05efca174f6" },
}
*/

const NAME_COLL = 'temp'
const INDEXES = [
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

class DBTemp extends DBBase {
  constructor(nmColl, indexes) {
    super(nmColl, indexes)
  }
}

module.exports = new DBTemp(NAME_COLL, INDEXES)
