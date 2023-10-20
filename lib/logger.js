const log4js = require('log4js')

let logger

/**
 * init in the app starting up
 *
 * @param {*} name
 * @param {*} useCategory
 * @returns
 */
const init = (name, useCategory) => {
  const LOGGER_LEVEL = process.env.LOGGER_LEVEL
  console.log('LOGGER_LEVEL------------------------', LOGGER_LEVEL)
  if (!LOGGER_LEVEL) {
    throw new Error('LOGGER_LEVEL not config')
  }

  name = name ?? 'app'
  const layout = {
    type: 'pattern',
    pattern: `%d{yyyy-MM-dd hh:mm:ss.SSS}${useCategory ? ' %c' : ''} %f{1}:%M:%l %p %m`,
  }
  log4js.configure({
    appenders: {
      console: { type: 'stdout', layout },
      file: { type: 'dateFile', filename: 'logs/' + name + '.log', layout, numBackups: 7, compress: false },
      fileError: { type: 'file', filename: 'logs/' + name + '.error.log', layout, maxLogSize: '20M', backups: 3 },
      filterError: {
        type: 'logLevelFilter',
        appender: 'fileError',
        level: 'error',
      },
    },
    categories: {
      default: { appenders: ['filterError', 'file', 'console'], level: LOGGER_LEVEL, enableCallStack: true },
    },
  })

  logger = log4js.getLogger()
  return logger
}

const shutdown = async () => {
  return new Promise((resolve, reject) => {
    log4js.shutdown((error) => {
      error ? reject(error) : resolve()
    })
  })
}

/**
 * note: must call it after init
 *
 * @param {*} category
 * @returns
 */
const getLogger = (category) => {
  return category ? log4js.getLogger(category) : logger
}

// ===========================================
// log level used default category

const trace = (message, ...args) => {
  logger.trace(message, ...args)
}

const debug = (message, ...args) => {
  logger.debug(message, ...args)
}

const info = (message, ...args) => {
  logger.info(message, ...args)
}

const warn = (message, ...args) => {
  logger.warn(message, ...args)
}

const error = (message, ...args) => {
  logger.error(message, ...args)
}

const fatal = (message, ...args) => {
  logger.fatal(message, ...args)
}

const mark = (message, ...args) => {
  logger.mark(message, ...args)
}

module.exports = {
  init,
  shutdown,
  getLogger,

  trace,
  debug,
  info,
  warn,
  error,
  fatal,
  mark,
}
