const sleep = async (interval) => {
  return new Promise((resolve) => setTimeout(resolve, interval))
}

const isEmptyObject = (obj) => {
  return !obj || Object.keys(obj).length === 0
}

const timeIntervalSec = (interval) => {
  return parseInt(new Date().getTime() / 1000 + interval)
}

const timeElapse = (start) => {
  return new Date().getTime() - start
}

const timeOver = (last, over) => {
  return new Date().getTime() - last > over
}

const timeNow = () => {
  return new Date().toISOString()
}

const timeThen = (timestamp) => {
  return new Date(timestamp).toISOString()
}

const reverseArrayConst = (arr) => {
  const arrReverse = []
  for (let i = arr.length - 1; i >= 0; --i) {
    arrReverse.push(arr[i])
  }
  return arrReverse
}

module.exports = {
  sleep,
  isEmptyObject,
  reverseArrayConst,
  timeIntervalSec,
  timeElapse,
  timeOver,
  timeNow,
  timeThen,
}
