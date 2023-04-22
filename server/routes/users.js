const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const { RegisterValidator, LoginValidator } = require('./validators/user')
const { User } = require('../models/user')
const { handleResult } = require('../utils/lib/helper')

const router = new Router({
  prefix: '/api/user'
})

// 用户注册
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    passWord: v.get('body.passWord2'),
    nickname: v.get('body.nickname')
  }

  const r = await User.create(user)
  handleResult('注册成功')
})

// 登录
router.post('/login', async (ctx) => {
  const v = await new LoginValidator().validate(ctx)
  const token = jwt.sign({
    email: v.get('body.email'),
    passWord: v.get('body.passWord'),
  }, 'power-admin', { expiresIn: '10h' })

  ctx.body = { data: {token}, code: 200,msg:'登陆成功' }
  // handleResult('登录成功')
})



module.exports = router
