const Koa = require('koa')
const app = new Koa()
const InitManager = require('./utils/init')
const parser = require('koa-bodyparser')
const catchError = require('./utils/middlewares/exception')

app.use(catchError)
app.use(parser())
InitManager.initCore(app)

app.listen(3000)
// module.exports = app
