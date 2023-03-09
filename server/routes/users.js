// 用户管理模块
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const jwt = require('jsonwebtoken')

router.prefix('/users')

// 用户登录
router.post('/login', async (ctx) => {
  try {
    const { userName, passWord } = ctx.request.body;
    /**
     * 返回数据库指定字段，有三种方式
     * 1. 'userId userName userEmail state role deptId roleList'
     * 2. {userId:1,_id:0}
     * 3. select('userId')
     */
    const res = await User.findOne({ userName, passWord }, '_id token')

    if (res) {
      const data = res._doc;
      const token = jwt.sign({ data }, 'power-admin', { expiresIn: '10h' })
      data.token = `Bearer ${token}`;
      ctx.body = util.success(data)
    } else {
      ctx.body = util.fail("账号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

// 用户信息
router.post('/userInfo', async (ctx) => {
  try {
    const { _id } = ctx.request.body
    const res = await User.findOne({ _id }, { passWord: 0 })
    if (res) {
      const data = {
        info: res._doc,
        menu: [],
        siteConfig: {}
      }
      ctx.body = util.success(data, 'success')
    }
  }
  catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

module.exports = router
