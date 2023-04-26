const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    roleName: String, // 角色名称
    status: { type: String, default: '1' }, // 角色状态0:禁用  1: 启用 
    remark: String, //角色描述
    checkedKeys: [],// 角色拥有权限
    halfCheckedKeys: [],  //角色拥有权限父级
    // permissionList: [],// 全部权限点
    createTime: { type: Date, default: Date.now() },//创建时间
    updateTime: { type: Date, default: Date.now() },//更新时间 
})

module.exports = mongoose.model("roles", userSchema, "roles")