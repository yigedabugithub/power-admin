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

// lifer信息查询
router.get('/userInfo', async (ctx) => {
  let parts = ctx.request.header.authorization.split(' ');
  try {
    const ndata = util.userInfoJwt(parts)
    const res = await lifeUser.findOne({ _id: ndata._id }, { passWord: 0 })
    if (res) {
      ctx.body = util.success(res._doc, 'success')
    }
  } catch (e) {
    console.log(e)
  }
})

// lifer信息编辑保存
router.post('/edit', async (ctx) => {
  const { _id, ...dataPost } = ctx.request.body;
  try {
    const res = await lifeUser.findOneAndUpdate({ _id }, dataPost)
    if (res) ctx.body = util.success({}, '更新成功')
  } catch (error) {
    ctx.body = util.fail(error.stack, '更新失败')
  }

})

module.exports = router