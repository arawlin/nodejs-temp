require('dotenv').config()
const WS = require('../lib/websocket')
require('../lib/logger').init('websocket-test')
const log = require('../lib/logger')

let count = 0
let disconnected = false

const ws = new WS('ws://localhost:1010', { retryCount: 2, retryInterval: 3000 }, (event) => {
  log.info(event.data, event.type)
})
log.info(ws.url, ws.options)

ws.on('connect', () => {
  log.info('connect wsr')
})
ws.on('disconnect', () => {
  disconnected = true
  log.info('disconnect wsr')
})
ws.on('reconnect', () => {
  log.info('reconnect wsr', ++count)
})
ws.on('open', (event) => {
  log.info('open wsr', event.type)
})
ws.on('error', (event) => {
  log.error('error wsr!!!!!!!!!', event.type)
})
ws.on('close', (event) => {
  log.info('close wsr', event.type)
})

const intervalID = setInterval(() => {
  ws.isConnected && ws.send(count)
  if (disconnected) {
    clearInterval(intervalID)
  }
}, 1 * 1000)

setTimeout(() => {
  ws.disconnect()
}, 100 * 1000)
