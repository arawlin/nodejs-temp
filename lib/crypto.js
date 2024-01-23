const { createHash } = require('node:crypto')

const encrypt = (algorithm, content) => {
  let hash = createHash(algorithm)
  hash.update(content)
  return hash.digest('hex')
}

const sha1 = (content) => encrypt('sha1', content)

const sha256 = (content) => encrypt('sha256', content)

const md5 = (content) => encrypt('md5', content)

module.exports = {
  sha1,
  sha256,
  md5,
  encrypt,
}
