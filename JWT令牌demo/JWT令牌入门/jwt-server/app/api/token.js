const Router = require('@koa/router')
const { generateToken } = require('../../core/util')
const users = require('../data/users')
const { Auth } = require('../../middlewares/auth')

const tokenRouter = new Router({
  // 设置路由前缀 /token
  prefix: '/token'
})

//检测用户名密码，返回token接口
tokenRouter.post('/', async ctx => {
  const { username, password } = ctx.request.body

  const token = verifyUsernamePassword(username, parseInt(password))

  if (!token) {
    ctx.body = {
      errCode: 10001,
      msg: '用户名或密码错误',
      request: `${ctx.method} ${ctx.path}`
    }
    return
  }

  ctx.body = {
    token
  }
})

tokenRouter.post('/verify', async (ctx, next) => {

})

tokenRouter.get('/test', async ctx => {
  ctx.body = 'test'
})

//校验用户名和密码
function verifyUsernamePassword(username, password) {
  const index = users.findIndex(user => user.username === username && user.password === password)

  const user = users[index]
  console.log(user);
  if (!user) {
    return
  }
  const token = generateToken(user.id, 2)
  return token
}

module.exports = tokenRouter