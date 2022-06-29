const Router = require('koa-router')
const router = new Router()

router.get('/api/', (ctx, next) => {
  ctx.body = 'hello world!'
  next()
})