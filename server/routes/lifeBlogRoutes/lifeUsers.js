const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const lifeUser = require('../../models/lifeBlogModels/lifeUserSchema')
const util = require('../../utils/util')

router.prefix('/lifeUser')

// lifer登录
router.post('/login', async (ctx) => {
  try {
    const { userName, passWord } = ctx.request.body;
    const res = await lifeUser.findOne({ userName, passWord }, '_id token')

    if (res) {
      const data = res._doc;
      const token = jwt.sign({ data }, 'power-admin', { expiresIn: '10h' })
      data.token = `Bearer ${token}`;
      ctx.body = util.success(data, '登录成功')
    } else {
      ctx.body = util.fail("账号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

module.exports = router