const path = require('path')
const log4js = require('log4js')

// logger配置
log4js.configure({
  appenders: {
    console: { type: 'console' },
    allLog: {
      type: 'dateFile',
      encoding: 'utf-8',
      filename: path.join('./logs', 'LogFile.log'),
      pattern: 'yyyy-MM-dd'  + '.log'
    }
  },
  categories: {
    default: {
      appenders: ['console', 'allLog'],
      level: 'info'
    }
  }
})

const logger = log4js.getLogger('[Default]')

module.exports = logger