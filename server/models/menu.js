const { sequelize } = require('../config/db');
const { DataTypes, Model } = require('sequelize');

// 角色模型
class Menu extends Model {

}
Menu.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parentId: DataTypes.INTEGER,//上级菜单id
    title: DataTypes.STRING,//菜单名称
    menu_type: DataTypes.STRING,//菜单类型(menu_type,type):目录=null,menu_dir ;菜单项=tab,menu ;按钮=null,button
    type: DataTypes.STRING,
    menuCode: DataTypes.STRING,//权限标识
    path: DataTypes.STRING,//路由地址
    name: DataTypes.STRING,//路由name
    icon: DataTypes.STRING,//图标
    component: DataTypes.STRING,//组件地址
    keepAlive: DataTypes.INTEGER,//缓存状态,启用0，禁用1
    hidden: DataTypes.INTEGER,//显示状态,显示0，隐藏1
    extend: DataTypes.STRING,  //add_menu_only,add_rules_only
    url: DataTypes.STRING, //外部链接地址

}, {
    sequelize,
    tableName: 'menu'
})

module.exports = {
    Menu
}
