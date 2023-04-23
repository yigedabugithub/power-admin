const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const sequel = require('sequelize');
const { RegisterValidator, LoginValidator } = require('./validators/valiUser')
const { User } = require('../models/user')
const { success, userInfoJwt, pager } = require('../utils/index')

// 路由前缀
const router = new Router({ prefix: '/api/user' })

// 用户注册
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    passWord: v.get('body.passWord2'),
    nickname: v.get('body.nickname')
  }

  const r = await User.create(user)
  ctx.body = success({}, '注册成功')

})

// 用户登录
router.post('/login', async (ctx) => {
  const v = await new LoginValidator().validate(ctx)

  const token = jwt.sign({
    email: v.get('body.email'),
    passWord: v.get('body.passWord'),
  }, 'power-admin', { expiresIn: '10h' })

  ctx.body = success({ token: `Bearer ${token}` }, '登陆成功')
})

// 用户信息(info,menu)
router.get('/userInfo', async (ctx) => {
  let parts = ctx.request.header.authorization.split(' ');
  const tdata = userInfoJwt(parts)
  const user = await User.findOne({
    where: {
      email: tdata.email
    },
    attributes: { exclude: ['password', 'deleted_at', 'updated_at'] }
  })
  ctx.body = success(user, 'success')

})

// 用户新增
router.post('/add', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    passWord: v.get('body.passWord2'),
    nickname: v.get('body.nickname')
  }

  const r = await User.create(user)
  ctx.body = success({}, '新增成功')
})

// 用户列表
router.get('/index', async (ctx) => {
  const { email } = ctx.request.query
  const { page, skipIndex } = pager(ctx.request.query)
  let whereObj = {};
  let list = null

  email && Object.assign(whereObj, {
    email: {
      [sequel.Op.like]: `%${email}%`
    },
  });
  // 查数量
  let total = await User.count({
    where: whereObj,
  }) ?? 0
  if (total >= 0) {
    let _pageInfo = {
      limit: page.pageSize,
      offset: (page.pageNum - 1) * page.pageSize
    }
    list = await User.findAll({
      attributes: { exclude: ['password', 'deleted_at', 'updated_at'] },
      where: whereObj,
      ..._pageInfo
    });

  }
  ctx.body = success({ list, total }, '查询成功')

})

// 用户编辑回显详情
router.get('/edit', async (ctx) => {
  const { id } = ctx.request.query
  const user = await User.findOne({
    where: {
      id: id
    },
    attributes: { exclude: ['password', 'deleted_at', 'updated_at'] }
  })
  ctx.body = success(user, '查询成功')

})

// 用户编辑保存
router.post('/edit', async (ctx) => {
  const { id, email } = ctx.request.body
  await User.update(
    { email },
    {
      where: { id }
    }
  )
  ctx.body = success({}, '修改成功')

})

// 用户删除/批量删除
router.delete('/del', async (ctx) => {
  const { ids } = ctx.request.body
  console.log(ids, '=====');
  let user = await User.destroy({
    where: { id: ids }
  });

  ctx.body = success({}, '删除成功')

})


module.exports = router
