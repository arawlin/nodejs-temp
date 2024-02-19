const schedule = require('node-schedule')
const { ToadScheduler } = require('toad-scheduler')

const taskSchedule = require('./taskScheduleTemp')
const taskToad = require('./taskToadTemp')

const init = (nmTask) => {
  const schedulerToad = new ToadScheduler()
  switch (nmTask) {
    case taskToad.name:
      schedulerToad.addSimpleIntervalJob(taskToad.task)
      break
  }

  schedule.scheduleJob(taskSchedule.cron, taskSchedule.task)
}

module.exports = {
  init,
}
