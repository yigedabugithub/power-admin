const router = require('koa-router')()
const util = require('../../utils/util')
const lifeLog = require('../../models/lifeBlogModels/lifeLogSchema')
router.prefix('/life')


// logs博客列表
router.get('/logs', async (ctx) => {
  let parts = ctx.request.header.authorization.split(' ');
  const { page, skipIndex } = util.pager(ctx.request.query)

  try {
    const ndata = util.userInfoJwt(parts)
    const res = await lifeLog.find({ userId: ndata._id }, { _id: 0 }).skip(skipIndex).limit(page.pageSize)
    const total = await lifeLog.countDocuments({ userId: ndata._id })
    ctx.body = util.success({ list: res, total })

  } catch (e) {
    console.log(e)
  }
})

// 博客创建
router.post('/creatLog', async (ctx) => {
  const postData = ctx.request.body;
  try {
    const res = await lifeLog.create(postData)
    if (res) ctx.body = util.success({}, '创建成功')
  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})



module.exports = router
