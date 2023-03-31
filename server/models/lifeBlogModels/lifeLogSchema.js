const mongoose = require('mongoose')

const lifeLogSchema = mongoose.Schema({
  title: String,//标题
  content: String,//用户名称
  avatar: String,//头像
  createTime: { type: Date, default: Date.now() },//创建时间
  updateTime: { type: Date, default: Date.now() },//更新时间 
  remark: String
})

module.exports = mongoose.model("lifeLogs", lifeLogSchema, "lifeLogs")//model名称 模型 数据库集合名称