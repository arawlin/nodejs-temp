const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler')

const interval = {
  seconds: 10,
  runImmediately: true,
}
const options = {
  preventOverrun: true,
}

const name = 'task-toad'

const task = new SimpleIntervalJob(
  interval,
  new AsyncTask(name, async () => {
    logger.debug(name)
    try {
      // https://www.npmjs.com/package/toad-scheduler
      console.log('toad', new Date())
    } catch (e) {
      logger.error(e)
    }
  }),
  options,
)

module.exports = {
  name,
  task,
}
