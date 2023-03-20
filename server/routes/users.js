// 用户管理模块
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const jwt = require('jsonwebtoken')
const Menu = require('../models/menuSchema')
const Role = require('../models/roleSchema')

router.prefix('/users')

const userInfoJwt = (parts) => {
  let token = '';
  let ndata = '';
  if (parts.length == 2) {
    let scheme = parts[0];
    let credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      token = credentials; //最终获取到token          
    }
  }

  jwt.verify(token, 'power-admin', function (error, { data }) {
    if (error) {
      ctx.body = util.fail({}, 'token无效')
      next()
    }
    if (data) { ndata = data }
  })
  return ndata
}

// 用户列表
router.get('/index', async (ctx) => {
  const { _id, userName, state } = ctx.request.query
  const { page, skipIndex } = util.pager(ctx.request.query)
  let params = {}
  if (_id) params._id = _id
  if (userName) params.userName = userName
  if (state && state != '2') params.state = state
  try {
    const query = User.find(params, { passWord: 0 })
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await User.countDocuments(params)
    ctx.body = util.success({ list, total })
  } catch (error) {
    ctx.body = util.fail(`查询异常：${error.stack}`)
  }
})

// 用户登录
router.post('/login', async (ctx) => {
  try {
    const { userName, passWord } = ctx.request.body;
    /**
     * 返回数据库指定字段，有三种方式
     * 1. '_id userName userEmail state role deptId roleList'
     * 2. {_id:1,_id:0}
     * 3. select('_id')
     */
    const res = await User.findOne({ userName, passWord }, '_id token')

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

// 用户信息(info,menu)
router.get('/userInfo', async (ctx) => {
  let parts = ctx.request.header.authorization.split(' ');
  try {
    const ndata = userInfoJwt(parts)

    // id查询用户拥有的角色
    const roleObj = await User.findOne({ _id_id: ndata._id_id }, 'roleList')
    // 根据已有角色合并权限点
    const roleList = await Role.find({ _id: { $in: roleObj.roleList } })

    let checkedKeys = []
    roleList.map(item => {
      checkedKeys.push(...item.checkedKeys)
      checkedKeys.push(...item.halfCheckedKeys)
    })
    checkedKeys = [...new Set(checkedKeys)]
    let rootList = await Menu.find({ _id: { $in: checkedKeys } })
    const list = util.getTreeMenu(rootList, '012345678910111213141516', [])
    const res = await User.findOne({ _id: ndata._id }, { passWord: 0 })
    if (res) {
      const userInfo = {
        info: res._doc,
        menus: list,
        siteConfig: {}
      }
      ctx.body = util.success(userInfo, 'success')
    }
  } catch (e) {
    next(e)
  }
})

// 用户新增
router.post('/add', async (ctx) => {
  const { userName, userEmail } = ctx.request.body;
  const enterData = ctx.request.body;
  if (!userName || !userEmail) {
    ctx.body = util.fail('参数错误', util.CODE.PARAM_ERROR)
    return;
  }
  const res = await User.findOne({ $or: [{ userName }, { userEmail }] }, '_id userName userEmail')
  if (res) {
    ctx.body = util.fail(`系统监测到有重复的用户，信息如下：${res.userName} - ${res.userEmail}`)
  } else {
    try {
      const res = await User.create(enterData)
      if (res) ctx.body = util.success('', '用户创建成功');
    } catch (error) {
      ctx.body = util.fail(error.stack, '用户创建失败');
    }
  }
})

// 用户编辑回显详情
router.get('/edit', async (ctx) => {
  const { _id } = ctx.request.query;
  if (!_id) {
    ctx.body = util.fail('_id不能为空', util.CODE.PARAM_ERROR)
    return;
  }
  try {
    const res = await User.findOne({ _id })
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
    const res = await User.findOneAndUpdate({ _id }, dataPost)
    if (res) ctx.body = util.success({}, '更新成功')
  } catch (error) {
    ctx.body = util.fail(error.stack, '更新失败')
  }

})

// 用户删除/批量删除
router.delete('/del', async (ctx) => {
  // 待删除的用户Id数组
  const delList = ctx.request.body
  // User.updateMany({ $or: [{ _id: 10001 }, { _id: 10002 }] })
  // delList.forEach(item => item._id = item);
  const res = await User.updateMany({ _id: { $in: delList } }, { state: 2 })
  if (res.modifiedCount) { //原来nModified-//-modifiedCount
    ctx.body = util.success(res, `共成功删除${res.modifiedCount}条`)
    return;
  }
  ctx.body = util.fail('删除失败');
})

module.exports = router
