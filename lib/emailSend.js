require('dotenv').config()
const axios = require('axios').default

const config = {
  baseURL: process.env.EMAIL_API_URL,
  timeout: Number(process.env.EMAIL_API_TIMEOUT),
}

const send = async (subject, text) => {
  try {
    const data = { subject, text }
    config.params = { data: JSON.stringify(data) }
    const res = await axios.get(process.env.EMAIL_API_PATH, config)
    return res?.data
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  send,
}
