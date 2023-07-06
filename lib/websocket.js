const WS = require('ws')
const EventEmitter = require('node:events')

/**
 * websocket that can reconnect
 *
 * fnReceive - callback function of onmessage of ws with `WebSocket.MessageEvent`
 * options - options of ws as well as {retryCount = -1, retryInterval = 5000}, -1 means forever reconnect
 */
class WebSocket extends EventEmitter {
  url
  options
  fnReceive

  retryCountRaw
  retryInterval

  socket
  isConnected = false
  retryCountCurrent
  #reconnectTimeoutID = 0

  constructor(url, options, fnReceive) {
    super()

    this.url = url
    this.options = options ?? {}
    this.fnReceive = fnReceive

    this.retryCountRaw = options.retryCount ?? -1
    this.retryInterval = options.retryInterval ?? 5000

    this.connect()
  }

  connect() {
    this.socket = new WS(this.url, this.options)
    this.socket.onopen = this.onopen.bind(this)
    this.socket.onerror = this.onerror.bind(this)
    this.socket.onclose = this.onclose.bind(this)
    this.socket.onmessage = this.fnReceive

    this.emit('connect')
  }

  disconnect() {
    clearTimeout(this.#reconnectTimeoutID)
    this.retryCountCurrent = 0
    this.socket.close()

    this.emit('disconnect')
  }

  send(data) {
    this.socket.send(data)
  }

  onopen(event) {
    this.isConnected = true
    this.retryCountCurrent = this.retryCountRaw
    this.emit('open', event)
  }

  onerror(event) {
    this.emit('error', event)
  }

  onclose(event) {
    this.isConnected = false
    this.emit('close', event)

    // -1 means forever reconnect
    if (this.retryCountCurrent === 0) {
      return
    }
    if (this.retryCountCurrent > 0) {
      this.retryCountCurrent--
    }

    clearTimeout(this.#reconnectTimeoutID)
    this.#reconnectTimeoutID = setTimeout(() => {
      this.connect()
      this.emit('reconnect')
    }, this.retryInterval)
  }
}

module.exports = WebSocket
