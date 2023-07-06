const WS = require('../lib/websocket')
const log = require('../lib/logger').init('websocket-test')

let count = 0

const ws = new WS('ws://localhost:1010', { retryCount: 5, retryInterval: 3000 }, (event) => {
  log.info(event.data, event.type)
})
log.info(ws.url, ws.options)

ws.on('connect', () => {
  log.info('connect wsr')
})
ws.on('disconnect', () => {
  log.info('disconnect wsr')
})
ws.on('reconnect', () => {
  log.info('reconnect wsr')
})
ws.on('open', (event) => {
  log.info('open wsr', event.type)
})
ws.on('error', (event) => {
  log.error(count++, 'error wsr', event.type)
})
ws.on('close', (event) => {
  log.info('close wsr', event.type)
})

setTimeout(() => {
  ws.disconnect()
}, 10 * 1000)
