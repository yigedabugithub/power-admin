const jwt = require('jsonwebtoken')
// 成功
const success = (data = {}, msg = 'ok', code = 200) => {
  // log4js.debug(data);
  return {
    code, data, msg
  }
}
// 失败
const fail = (msg = {}, code = 401, data = '') => {
  // log4js.debug(msg);
  return {
    code, data, msg
  }
}

const findMembers = function (instance, {
  prefix,
  specifiedType,
  filter
}) {
  // 递归函数
  function _find(instance) {
    //基线条件（跳出递归）
    if (instance.__proto__ === null)
      return []

    let names = Reflect.ownKeys(instance)
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })

    return [...names, ..._find(instance.__proto__)]
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix)
      if (value.startsWith(prefix))
        return true
    if (specifiedType)
      if (instance[value] instanceof specifiedType)
        return true
  }

  return _find(instance)
}

// token解析用户信息获取
const userInfoJwt = (parts) => {
  let token = '';
  let ndata = '';
  if (parts.length == 2) {
    let scheme = parts[0];
    let credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      token = credentials; //最终获取到token          
    }
  }

  jwt.verify(token, 'power-admin', function (error, data) {
    if (error) {
      next()
      throw new Error('token无效')
    }

    if (data) { ndata = data }
  })

  return ndata
}

// 分页
const pager = ({ pageNum = 1, pageSize = 10 }) => {
  pageNum *= 1;
  pageSize *= 1;
  const skipIndex = (pageNum - 1) * pageSize;
  return {
    page: {
      pageNum,
      pageSize
    },
    skipIndex
  }
}
module.exports = {
  findMembers,
  success,
  fail,
  userInfoJwt,
  pager

}