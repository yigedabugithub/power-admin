const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt')
const log4js = require('./utils/log4js')
const router = require('koa-router')()
const cors = require('koa2-cors'); //跨域处理

const users = require('./routes/users')
const menus = require('./routes/menus')
const roles = require('./routes/roles')

// 
const lifeUsers = require('./routes/lifeBlogRoutes/lifeUsers')


require('./config/db')

// error handler
onerror(app)

// middlewares
app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      // if (ctx.url === '/test') {
      //   return '*'; // 允许来自所有域名请求
      // }
      return '*'; //只允许http://localhost:8080这个域名的请求
      // return 'http://123.249.122.1:3000'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(koajwt({ secret: 'power-admin' }).unless({ path: [/login$/] }))
// app.use(koajwt({ secret: 'power-admin' }).unless({ path: [/^\/api\/users\/login/] }))
app.use(views(__dirname + '/views', { extension: 'pug' }))

// logger
app.use(async (ctx, next) => {
  log4js.info(`get params:${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post params:${JSON.stringify(ctx.request.body)}`)
  await next().catch((err) => {
    if (err.status == '401') {
      ctx.status = 200;
      ctx.body = util.fail('Token认证失败', util.CODE.AUTH_ERROR)
    } else {
      throw err;
    }
  })
})

// routes
router.prefix("/api")
router.use(users.routes(), users.allowedMethods())
router.use(menus.routes(), menus.allowedMethods())
router.use(roles.routes(), roles.allowedMethods())

// 
router.use(lifeUsers.routes(), lifeUsers.allowedMethods())

app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => { console.error('server error', err, ctx) });

module.exports = app
