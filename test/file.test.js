const fs = require('../lib/file')

describe('file', () => {
  it('mkdir', async () => {
    await fs.mkdir('logs', 'bb', 'cc')
  })

  it('writ', async () => {
    await fs.writeLine('logs/bb/cc/a.a', 'aaa')
    await fs.writeLine('logs/bb/cc/a.a', 'bbb')
    await fs.writeLine('logs/bb/cc/a.a', 'ccc')
  })

  it('read', async () => {
    const ct = await fs.read('logs/bb/cc/a.a')
    console.log(ct)

    const lines = await fs.readLines('logs/bb/cc/a.a')
    console.log(lines)
  })
})
