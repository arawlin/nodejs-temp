const db = require('./index')

class DBBase {
  nmColl
  indexes

  constructor(nmColl, indexes) {
    this.nmColl = nmColl
    this.indexes = indexes
  }

  async init() {
    await db.createIndexes(this.nmColl, this.indexes)
  }

  async find(filter, options) {
    return await db.find(this.nmColl, filter, options)
  }

  async findOne(filter, options) {
    return await db.findOne(this.nmColl, filter, options)
  }

  async findOneByID(id, options) {
    return await db.findOneByID(this.nmColl, id, options)
  }

  async count(filter) {
    return await db.countDocuments(this.nmColl, filter)
  }
}

module.exports = DBBase
