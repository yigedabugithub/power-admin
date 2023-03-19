const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  parentId: mongoose.Types.ObjectId,//上级菜单
  title: String,//菜单名称
  menu_type: String,//菜单类型:目录0，菜单项1，按钮2
  type: String,//菜单类型:目录0，菜单项1，按钮2
  menuCode: String,//权限标识
  path: String,//路由地址
  icon: String,//图标
  component: String,//组件地址
  keepAlive: Number,//缓存状态,启用0，禁用1
  hidden: Number,//显示状态,显示0，隐藏1
  extend: String,
  url: String
  // "createTime": {
  //     type: Date,
  //     default: Date.now()
  // },//创建时间
  // "updateTime": {
  //     type: Date,
  //     default: Date.now()
  // },//更新时间
})

module.exports = mongoose.model("menu", userSchema, "menus")