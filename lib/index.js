const { v4: uuidv4 } = require('uuid')

const sleep = async (interval) => {
  return new Promise((resolve) => setTimeout(resolve, interval))
}

/**
 * [min, max]
 *
 * @param {*} min
 * @param {*} max
 * @returns
 */
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const isEmptyObject = (obj) => {
  return !obj || Object.keys(obj).length === 0
}

const isEmptyArray = (arr) => {
  return !arr || arr.length === 0
}

const isEmptyMap = (map) => {
  return !arr || arr.size === 0
}

const reverseArrayConst = (arr) => {
  const arrReverse = []
  for (let i = arr.length - 1; i >= 0; --i) {
    arrReverse.push(arr[i])
  }
  return arrReverse
}

const assignObject = (objfrom, objto) => {
  for (const k in objfrom) {
    objto[k] = objfrom[k]
  }
}

const findObjectKey = (obj, val) => {
  for (let k in obj) {
    if (obj[k] === val) {
      return k
    }
  }
}

const stringObject = (obj) => {
  const objc = {}
  for (let k in obj) {
    if (!obj.hasOwnProperty(k)) {
      continue
    }
    objc[k] = Array.isArray(obj[k]) ? stringObject(obj[k]) : obj[k].toString()
    // objc[k] = obj[k].toString()
  }
  return JSON.stringify(objc)
}

const loopGroupAction = async (action, params, curr, total, step = 1, thread = 8, numInThread = 10) => {
  while (true) {
    // [[0,1,2], [3,4,5], [6,7,8]] - step = 1
    // [[0,2,4], [6,8,10], [12,14,16]] - step = 2
    const windows = []
    let t = thread
    while (t-- > 0) {
      const count = Math.min(numInThread, total)
      if (count <= 0) {
        break
      }

      const window = []
      let countCur = count
      while (countCur-- > 0) {
        window.push(curr)
        curr += step
      }
      windows.push(window)
      total -= count
    }
    if (windows.length === 0) {
      break
    }
    console.log(windows, ' =========== ')

    const actions = windows.map((w) => action(params, w))
    await Promise.all(actions)
  }
}

const timeIntervalSec = (interval) => {
  return parseInt(new Date().getTime() / 1000 + interval)
}

const timeElapse = (start) => {
  return new Date().getTime() - start
}

const timeOver = (now, last, over = 0) => {
  return new Date(now).getTime() - new Date(last).getTime() > over
}

const timeNow = (toDate = false) => {
  const now = new Date()
  return toDate ? now : now.toISOString()
}

const timeThen = (interval, toDate = false) => {
  const nowTime = new Date().getTime()
  const then = new Date(nowTime + Number(interval))
  return toDate ? then : then.toISOString()
}

const dateThen = (date, then) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + then)
}

const dateToday = () => {
  return dateThen(new Date(), 0)
}

const dateTomorrow = () => {
  return dateThen(new Date(), 1)
}

const dateYesterday = () => {
  return dateThen(new Date(), -1)
}

/**
 *
 * @param {*} date yyyy-MM-dd
 * @returns
 */
const dateWhen = (date) => {
  return new Date(date)
}

const orderID = () => {
  // uuid-time-random
  const uuid = uuidv4()
  const time = new Date().getTime()
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')
  return `${uuid}-${time}-${random}`
}

module.exports = {
  sleep,
  randomInt,

  isEmptyObject,
  isEmptyArray,
  isEmptyMap,
  reverseArrayConst,

  assignObject,
  isEmptyObject,
  findObjectKey,
  stringObject,

  loopGroupAction,

  timeIntervalSec,
  timeElapse,
  timeOver,
  timeNow,
  timeThen,

  dateToday,
  dateThen,
  dateTomorrow,
  dateYesterday,
  dateWhen,

  orderID,
}
