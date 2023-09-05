const expect = require('chai').expect

const crypto = require('../lib/crypto')

describe('crypto', () => {
  it('md5', () => {
    expect(crypto.md5('0')).equal('cfcd208495d565ef66e7dff9f98764da')
    expect(crypto.md5('1')).equal('c4ca4238a0b923820dcc509a6f75849b')
    expect(crypto.md5('asd123ggg')).equal('a18d61454c37e21d539873296fc8ec54')

    console.log(crypto.md5('asd123ggg'))
  })
})
