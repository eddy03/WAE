const nodeEnv = process.env.NODE_ENV
const dbLog = process.env.DB_LOG

if (nodeEnv === undefined || nodeEnv !== 'development') {
  require('dotenv').config()
}

const host = nodeEnv === 'test' ? process.env.CI_DB_HOST : process.env.DB_HOST
const username = nodeEnv === 'test' ? process.env.CI_DB_USER : process.env.DB_USER
const password = nodeEnv === 'test' ? process.env.CI_DB_PWD : process.env.DB_PWD
const database = nodeEnv === 'test' ? process.env.CI_DB_NAME : process.env.DB_NAME

module.exports = {
  host,
  username,
  password,
  database,
  dialect: 'postgres',
  logging: dbLog === 'true' ? console.log : false,
  pool: {
    max: 100,
    min: 1
  },
  timezone: '+08:00'
}
