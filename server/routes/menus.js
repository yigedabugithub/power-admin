const Router = require('koa-router')
const { Menu } = require('../models/menu')
const { success, fail, pager } = require('../utils/index')
const sequel = require('sequelize');

// 路由前缀
const router = new Router({ prefix: '/api/menu' })

// 菜单创建
router.post('/add', async (ctx) => {
  const postData = ctx.request.body;
  try {
    await Menu.create(postData)
    ctx.body = success({}, '创建成功')
  } catch (error) {
    ctx.body = fail(error)
  }
})
// // 菜单列表
router.get('/index', async (ctx) => {
  const { title } = ctx.request.query
  const { page, skipIndex } = pager(ctx.request.query)
  let whereObj = {};
  let list = null

  title && Object.assign(whereObj, {
    title: {
      [sequel.Op.like]: `%${title}%`
    },
  });
  // 查数量
  let total = await Menu.count({
    where: whereObj,
  }) ?? 0
  if (total >= 0) {
    let _pageInfo = {
      limit: page.pageSize,
      offset: (page.pageNum - 1) * page.pageSize
    }
    list = await Menu.findAll({
      attributes: { exclude: ['password', 'deleted_at', 'updated_at'] },
      where: whereObj,
      ..._pageInfo
    });

  }
  ctx.body = success({ list, total }, '查询成功')

})
// 菜单编辑
router.get('/edit', async (ctx) => {
  const { id } = ctx.request.query;
  try {
    const res = await Menu.findOne({ where: { id }, })
    if (res) ctx.body = success(res)
  } catch (error) {
    ctx.body = fail(error)
  }
})
router.post('/edit', async (ctx) => {
  const postData = ctx.request.body;
  try {
    await Menu.update(
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
// // 菜单删除
router.delete('/del', async (ctx) => {
  const { ids } = ctx.request.body
  await Menu.destroy({
    where: { id: ids }
  });

  ctx.body = success({}, '删除成功')
})
module.exports = router
