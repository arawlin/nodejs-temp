const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler')

const interval = {
  seconds: 10,
  runImmediately: true,
}
const options = {
  id: 'task toad temp',
  preventOverrun: true,
}

const task = new AsyncTask('task toad', async () => {
  // https://www.npmjs.com/package/toad-scheduler
  console.log('toad', new Date())
})

module.exports = new SimpleIntervalJob(interval, task, options)
