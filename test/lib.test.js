const expect = require('chai').expect

const lib = require('../lib')

describe('lib', () => {
  it('loopGroupAction', async () => {
    await lib.loopGroupAction(console.log, 'aaaa', 0, 11, 1, 4, 3)
  })
})
