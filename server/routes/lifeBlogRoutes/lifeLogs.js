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
    const res = await lifeLog.find({ userId: ndata._id }).skip(skipIndex).limit(page.pageSize)
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

// 博客删除
router.delete('/del', async (ctx) => {
  // 待删除的用户Id数组
  const { _id } = ctx.request.body
  const res = await lifeLog.deleteOne({ _id })
  console.log(res, '************');
  if (res.deletedCount >= 1) {
    ctx.body = util.success(res, '删除成功')
    return;
  }
  ctx.body = util.fail('删除失败');
})

// 博客编辑回显
router.get('/edit', async (ctx) => {
  const { _id } = ctx.request.query;
  if (!_id) {
    ctx.body = util.fail('_id不能为空', util.CODE.PARAM_ERROR)
    return;
  }
  try {
    const res = await lifeLog.findOne({ _id })
    if (res) {
      const data = res._doc;
      ctx.body = util.success(data)
    }
  } catch (error) {
    ctx.body = util.fail(`查询异常：${error.stack}`)
  }

})
// 用户编辑保存
router.post('/edit', async (ctx) => {
  const { _id, ...dataPost } = ctx.request.body;
  try {
    const res = await lifeLog.findOneAndUpdate({ _id }, dataPost)
    if (res) ctx.body = util.success({}, '更新成功')
  } catch (error) {
    ctx.body = util.fail(error.stack, '更新失败')
  }

})

module.exports = router
