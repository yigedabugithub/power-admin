const router = require('koa-router')()
const util = require('../utils/util')
const Menu = require('../models/menuSchema')
const User = require('./../models/userSchema')
const Role = require('../models/roleSchema')

router.prefix('/menus')

// 菜单列表查询
router.get('/routes', async (ctx) => {
  const { userId } = ctx.request.query;
  // id查询用户拥有的角色
  const roleObj = await User.findOne({ userId }, 'roleList')
  // 根据已有角色合并权限点
  const roleList = await Role.find({ _id: { $in: roleObj.roleList } })
  let checkedKeys = []
  roleList.map(item => {
    checkedKeys.push(...item.checkedKeys)
    checkedKeys.push(...item.halfCheckedKeys)
  })
  checkedKeys = [...new Set(checkedKeys)]
  let rootList = await Menu.find({ _id: { $in: checkedKeys } })
  const list = util.getTreeMenu(rootList, '111111111111111111111111', [])
  ctx.body = util.success(list, 'success');

})


// 菜单列表查询
router.get('/index', async (ctx) => {
  let rootList = await Menu.find() || []
  const list = util.getTreeMenu(rootList, '111111111111111111111111', [])
  ctx.body = util.success({ list }, 'success');
})

// 菜单创建
router.post('/add', async (ctx) => {
  const menuObj = ctx.request.body;
  try {
    const res = await Menu.create(menuObj)
    ctx.body = util.success(res, '创建成功')
  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})
// 菜单编辑
router.get('/edit', async (ctx) => {
  const { _id } = ctx.request.query;
  try {
    const res = await Menu.findOne({ _id })
    if (res) {
      const data = res._doc;
      ctx.body = util.success(data)
    }
  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})
router.post('/edit', async (ctx) => {
  const { _id, ...menuObj } = ctx.request.body;
  try {
    const res = await Menu.findByIdAndUpdate(_id, menuObj)
    if (res) ctx.body = util.success({}, '编辑成功')
  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})
// 菜单删除
router.delete('/del', async (ctx) => {
  const idList = ctx.request.body;
  try {
    idList.forEach(item => item._id = item);
    const res = await Menu.remove({ _id: { $in: idList } });
    if (res) ctx.body = util.success({}, '删除成功')

  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})

module.exports = router;