const mongoose = require('mongoose')

const lifeUserSchema = mongoose.Schema({
  // "_id": mongoose.Types.ObjectId,//用户ID
  nickName: String,//昵称
  userName: String,//用户名称
  passWord: String,//用户密码，md5加密
  userEmail: String,//用户邮箱
  avatar: String,//头像
  sex: Number,//性别 0:男  1：女 
  state: { type: String, default: '0' },//用户状态 0:禁用  1: 启用 2:删除
  createTime: { type: Date, default: Date.now() },//创建时间
  updateTime: { type: Date, default: Date.now() },//更新时间 
  remark: String
})

module.exports = mongoose.model("lifeUsers", lifeUserSchema, "lifeUsers")//model名称 模型 数据库集合名称