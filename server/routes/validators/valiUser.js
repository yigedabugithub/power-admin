const {
    Rule,
    LinValidator
} = require('../../utils/lin-validator-v2')
const bcrypt = require('bcryptjs')
const { User } = require('../../models/user')

// 注册校验
class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.email = [
            new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
        ]
        this.passWord1 = [
            // 用户密码指定范围
            new Rule('isLength', '密码至少6个字符，最多22个字符', {
                min: 6,
                max: 22
            }),
            new Rule(
                'matches',
                '密码长度必须在6~22位之间，包含字符、数字和 _ ',
                '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
            )
        ]
        this.passWord2 = this.passWord1
        this.nickname = [
            new Rule('isLength', '昵称长度必须在4~32之间', {
                min: 4,
                max: 32
            }),
        ]
    }

    validatepassWord(vals) {
        const psw1 = vals.body.passWord1
        const psw2 = vals.body.passWord2
        if (psw1 !== psw2) {
            throw new Error('两次输入的密码不一致，请重新输入')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('邮箱已被注册，请重新输入邮箱')
        }
    }
}
// 登录校验
class LoginValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.passWord = [
            new Rule('isOptional'),
            new Rule('isLength', '最少6个字符', {
                min: 6,
                max: 128
            })
        ]
    }
    // 登录校验
    async validateLogin(vals) {
        const user = await User.findOne({
            where: {
                email:vals.body.email
            }
        })
        if (!user) throw new global.errs.AuthFailed('账号不存在')
        // 验证密码
        const correct = bcrypt.compareSync(vals.body.passWord, user.password)
        if (!correct) throw new global.errs.AuthFailed('密码不正确')
        return user
    }

}
module.exports = {
    RegisterValidator,
    LoginValidator
}