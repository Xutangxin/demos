const jwt = require('jsonwebtoken')
const { secretKey, expiresIn } = require('../config/config')

//生成token uid用户id scope用户权限
function generateToken(uid, scope) {
  const token = jwt.sign(
    {
      uid,
      scope
    },
    secretKey,
    {
      expiresIn
    }
  )
  return token
}

module.exports = {
  generateToken
}