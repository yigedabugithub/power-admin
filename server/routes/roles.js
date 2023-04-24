const Router = require('koa-router')
const { Role } = require('../models/role')
const { success, fail, pager } = require('../utils/index')
const sequel = require('sequelize');


// 路由前缀
const router = new Router({ prefix: '/api/role' })
// 角色创建
router.post('/add', async (ctx) => {
  const postData = ctx.request.body;
  try {
    await Role.create(postData)
    ctx.body = success({}, '角色创建成功')
  } catch (error) {
    ctx.body = fail(error)
  }
})
// 用户列表
router.get('/index', async (ctx) => {
  const { roleName } = ctx.request.query
  const { page, skipIndex } = pager(ctx.request.query)
  let whereObj = {};
  let list = null

  roleName && Object.assign(whereObj, {
    roleName: {
      [sequel.Op.like]: `%${roleName}%`
    },
  });
  // 查数量
  let total = await Role.count({
    where: whereObj,
  }) ?? 0
  if (total >= 0) {
    let _pageInfo = {
      limit: page.pageSize,
      offset: (page.pageNum - 1) * page.pageSize
    }
    list = await Role.findAll({
      attributes: { exclude: ['password', 'deleted_at', 'updated_at'] },
      where: whereObj,
      ..._pageInfo
    });

  }
  ctx.body = success({ list, total }, '查询成功')

})
// 角色编辑
router.get('/edit', async (ctx) => {
  const { id } = ctx.request.query;
  try {
    const res = await Role.findOne({ where: { id }, })
    if (res) ctx.body = success(res)
  } catch (error) {
    ctx.body = fail(error)
  }
})
router.post('/edit', async (ctx) => {
  const postData = ctx.request.body;
  try {
    await Role.update(
      postData,
      {
        where: { id: postData.id }
      }
    )
    ctx.body = success({}, '编辑成功')
  } catch (error) {
    ctx.body = fail(error)
  }
})
// 角色删除
router.delete('/del', async (ctx) => {
  const { ids } = ctx.request.body
  await Role.destroy({
    where: { id: ids }
  });

  ctx.body = success({}, '删除成功')
})
module.exports = router
