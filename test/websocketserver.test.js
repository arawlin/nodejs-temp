const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 1010 })

wss.on('connection', function (ws) {
  console.log('new connection', ws instanceof WebSocket, Object.getOwnPropertyNames(ws))

  ws.on('message', function incoming(data) {
    console.log('incoming message: ' + data)
  })

  ws.on('close', function () {
    console.log('client socket closed')
  })

  setInterval(function () {
    ws?.close()
  }, 10000)

  setInterval(function () {
    if (ws.readyState === 1) ws.send('hello')
  }, 1000)
})

console.log('listening ------------ ')
