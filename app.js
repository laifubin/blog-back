const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const UserController = require('./src/login.js')
const Router = require('@koa/router')
const router = new Router()
// const user = new UserController()
const app = new Koa()

router.get('/hello', (ctx, next) => {
  ctx.body = 'hello world!'
  next()
})

app.use(bodyParser())
router.post('/logined',UserController.login)

app.use(router.routes()).use(router.allowedMethods());
// app.post('/login', UserController.login)
app.listen(3000)

 
  