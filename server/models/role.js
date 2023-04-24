const { sequelize } = require('../config/db');
const { DataTypes, Model } = require('sequelize');

// 角色模型
class Role extends Model {

}
Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleName: {
        type: DataTypes.STRING,
        unique: true
    },
    roleStatus: DataTypes.INTEGER,
    remark: DataTypes.STRING,
    checkedKeys: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('checkedKeys').split(',');
        },
        set(value) {
            return this.setDataValue('checkedKeys', value.join(','))
        }
    },
    halfCheckedKeys: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('halfCheckedKeys').split(',');
        },
        set(value) {
            return this.setDataValue('halfCheckedKeys', value.join(','))
        }
    },

}, {
    sequelize,
    tableName: 'role'
})

module.exports = {
    Role
}
