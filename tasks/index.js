const schedule = require('node-schedule')
const { ToadScheduler } = require('toad-scheduler')

const taskSchedule = require('./taskScheduleTemp')
const taskToad = require('./taskToadTemp')

const init = () => {
  const schedulerToad = new ToadScheduler()
  schedulerToad.addSimpleIntervalJob(taskToad)

  schedule.scheduleJob(taskSchedule.cron, taskSchedule.task)
}

module.exports = {
  init,
}
