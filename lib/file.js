const fs = require('node:fs/promises')
const path = require('node:path')

const mkdir = async (...paths) => {
  const p = path.join(...paths)
  await fs.mkdir(p, { recursive: true })
}

const read = async (path, encoding = 'utf8') => {
  return await fs.readFile(path, { encoding })
}

const readLines = async (path) => {
  const ct = await read(path)
  return ct.split('\n')
}

const writeLine = async (path, line, encoding = 'utf8') => {
  await fs.appendFile(path, line + '\n', { encoding })
}

module.exports = {
  mkdir,
  read,
  readLines,
  writeLine,
}
