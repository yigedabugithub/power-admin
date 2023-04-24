const bcrypt = require('bcryptjs')
const { sequelize } = require('../config/db');
const { DataTypes, Model } = require('sequelize');

// 初始用户模型
class User extends Model {

}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: DataTypes.STRING,
    email: {
        type: DataTypes.STRING(128),
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        set(val) {
            // 加密
            const salt = bcrypt.genSaltSync(10)
            // 生成加密密码
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue("password", psw)
        }
    },

}, {
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}
