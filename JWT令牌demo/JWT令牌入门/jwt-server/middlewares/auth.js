const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/config')

class Auth {
  constructor(level) {
    Auth.USER = 2
    Auth.ADMIN = 8
    this.level = level
  }

  //权限控制
  get middleware() {
    return async (ctx, next) => {
      const token = basicAuth(ctx.request)
      let errMsg = 'token不合法'

      //token为空
      if (!token || token.name === 'null') {
        ctx.body = {
          errCode: 10005,
          msg: errMsg,
          request: `${ctx.request} ${ctx.path}`
        }
        return
      }

      try {
        var decoded = jwt.verify(token.name, secretKey)
      } catch (e) {
        //token过期
        if (e.name === 'tokenExpiredError') {
          errMsg = 'token已过期'
        }
        ctx.body = {
          errCode: 10005,
          msg: errMsg,
          request: `${ctx.request} ${ctx.path}`
        }
        return
      }

      //权限不足
      if (decoded.scope < this.level) {
        ctx.body = {
          errCode: 10006,
          msg: '权限不足',
          request: `${ctx.request} ${ctx.path}`
        }
        return
      }

      await next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, secretKey)
      return true
    } catch (e) {
      return false
    }
  }
}

module.exports = {
  Auth
}