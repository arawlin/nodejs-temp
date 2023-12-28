const sleep = async (interval) => {
  return new Promise((resolve) => setTimeout(resolve, interval))
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

const assignObject = (objfrom, objto) => {
  for (const k in objfrom) {
    objto[k] = objfrom[k]
  }
}

const isEmptyObject = (obj) => {
  return !obj || Object.keys(obj).length === 0
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

module.exports = {
  sleep,
  timeIntervalSec,
  timeElapse,
  timeOver,
  timeNow,
  timeThen,

  reverseArrayConst,

  assignObject,
  isEmptyObject,
  findObjectKey,
  stringObject,

  loopGroupAction,
}
