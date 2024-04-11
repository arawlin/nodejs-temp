const nodemailer = require('nodemailer')

const validate = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

let transporter

const init = () => {
  if (!process.env.EMAIL_HOST) {
    console.log('email not config')
  }

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    debug: false,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  })

  runQueue()

  console.log('email init success')
}

const send = async (subject, content, to) => {
  if (!subject || !content) {
    console.log('subject or text is empty')
    return
  }

  if (!to || to.indexOf('@') < 0) {
    console.log('to error')
    return
  }
  const mo = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html: content,
  }

  try {
    const info = await transporter.sendMail(mo)
    // console.log('email:', info.messageId, new Date(), mo)
  } catch (e) {
    console.error(`${new Date()} - ${mo}`, e)
  }
}

// { subject, content, to }
const queue = new Map()
const QUEUE_WAIT_TIME = 10

const sendInQueue = (subject, content, to) => {
  queue.set(to, { subject, content, to })
}

const doOnQueue = async () => {
  const cs = new Map(queue)
  queue.clear()

  for (const [_, c] of cs) {
    await send(c.subject, c.content, c.to)
  }
}

const runQueue = () => {
  setInterval(doOnQueue, QUEUE_WAIT_TIME * 1000)
}

module.exports = {
  validate,
  init,
  send,
  sendInQueue,
}
