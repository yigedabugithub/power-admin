/**
 * 用户管理模块
 */
const router = require('koa-router')()
const Role = require('../models/roleSchema')
const util = require('../utils/util')

router.prefix('/roles')

// 查询所有角色列表
router.get('/allList', async (ctx) => {
  try {
    const list = await Role.find({}, "_id roleName")
    ctx.body = util.success(list);
  } catch (error) {
    ctx.body = util.fail(`查询失败:${error.stack}`)
  }
})

// 按页获取角色列表
router.get('/index', async (ctx) => {
  const { roleName } = ctx.request.query;
  const { page, skipIndex } = util.pager(ctx.request.query)
  try {
    let params = {}
    if (roleName) params.roleName = roleName;
    const query = Role.find(params)
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await Role.countDocuments(params);
    ctx.body = util.success({ list, total })
  } catch (error) {
    ctx.body = util.fail(`查询失败：${error.stack}`)
  }
})

// 角色创建
router.post('/add', async (ctx) => {
  const postData = ctx.request.body;
  try {
    const res = await Role.create(postData)
    if (res) ctx.body = util.success({}, '创建成功')
  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})
// 角色编辑
router.get('/edit', async (ctx) => {
  const { _id } = ctx.request.query;
  try {
    const res = await Role.findOne({ _id })
    if (res) {
      const data = res._doc;
      ctx.body = util.success(data)
    }
  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})
router.post('/edit', async (ctx) => {
  const { _id, roleName, remark, checkedKeys } = ctx.request.body;
  if (!_id) {
    ctx.body = util.fail('_id不能为空', util.CODE.PARAM_ERROR)
    return;
  }
  try {
    const params = { roleName, remark, checkedKeys }
    params.updateTime = new Date();
    const res = await Role.findByIdAndUpdate(_id, params)
    if (res) ctx.body = util.success({}, '编辑成功')
  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})
// 角色删除
router.delete('/del', async (ctx) => {
  const idList = ctx.request.body;
  try {
    idList.forEach(item => item._id = item);
    console.log(Role.remove,'----------------Role');
    const res = await Role.remove({ _id: { $in: idList } });
    if (res) ctx.body = util.success({}, '删除成功')

  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})

// 权限设置
router.post('/update/permission', async (ctx) => {
  const { _id, permissionList } = ctx.request.body;
  try {
    let params = { permissionList, update: new Date() }
    let res = await Role.findByIdAndUpdate(_id, params)
    ctx.body = util.success('', "权限设置成功")
  } catch (error) {
    ctx.body = util.fail("权限设置失败")
  }
})
module.exports = router;
