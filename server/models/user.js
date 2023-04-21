const bcrypt = require('bcryptjs')

const { sequelize } = require('../config/db');
const { Sequelize, Model } = require('sequelize');

// 用户模型
class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        // 查询用户
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) throw new global.errs.AuthFailed('账号不存在')
        // 验证密码
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) throw new global.errs.AuthFailed('密码不正确')
        return user
    }


}

// 初始用户模型
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
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
