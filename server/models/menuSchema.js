const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  parentId: mongoose.Types.ObjectId,//上级菜单id
  title: String,//菜单名称
  menu_type: String,//菜单类型(menu_type,type):目录=null,menu_dir ;菜单项=tab,menu ;按钮=null,button
  type: String,
  menuCode: String,//权限标识
  path: String,//路由地址
  name: String,//路由name
  icon: String,//图标
  component: String,//组件地址
  keepAlive: Number,//缓存状态,启用0，禁用1
  hidden: Number,//显示状态,显示0，隐藏1
  extend: String,  //add_menu_only,add_rules_only
  url: String, //外部链接地址
  createTime: { type: Date, default: Date.now() },//创建时间
  updateTime: { type: Date, default: Date.now() },//更新时间 
})

module.exports = mongoose.model("menu", userSchema, "menus")