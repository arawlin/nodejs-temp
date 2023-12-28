const fs = require('../lib/file')

describe('file', () => {
  it('mkdir', async () => {
    await fs.mkdir('aa', 'bb', 'cc')
  })

  it('read', async () => {
    const ct = await fs.read('aa/bb/cc/a.a')
    console.log(ct)

    const lines = await fs.readLine('aa/bb/cc/a.a')
    console.log(lines)
  })
})
