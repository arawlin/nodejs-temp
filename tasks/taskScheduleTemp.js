const cron = '0 0/1 * * * *'

const task = async () => {
  // https://www.npmjs.com/package/node-schedule
  console.log('schedule', new Date())
}

module.exports = {
  cron,
  task,
}
