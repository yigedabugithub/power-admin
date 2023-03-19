const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    roleName: String, // 角色名称
    roleStatus: Number, // 角色状态
    remark: String, //角色描述
    // 角色拥有权限
    checkedKeys: [],
    halfCheckedKeys: [],
    // 全部权限点
    permissionList: [],
    // 创建时间
    createTime: {
        type: Date,
        default: Date.now()
    },
    // 修改时间
    updateTime: {
        type: Date,
        default: Date.now()
    },

})

module.exports = mongoose.model("roles", userSchema, "roles")