const Koa = require('koa')
const app = new Koa()
const InitManager = require('./utils/init')

InitManager.initCore(app)

module.exports = app
