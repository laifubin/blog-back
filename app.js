const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const UserController = require('./src/login.js')
const BlogController = require('./src/blog.js')
const Router = require('@koa/router')
const router = new Router()
// const user = new UserController()
const app = new Koa()

router.get('/hello', (ctx, next) => {
  ctx.body = 'hello world!'
  next()
})

app.use(bodyParser())
router.post('/login',UserController.login)

// 文章增删改查
router.post('/blog/search',BlogController.search)
router.post('/blog/update',BlogController.update)
router.get('/blog/details',BlogController.details)
router.get('/blog/delete',BlogController.delete)
router.get('/blog/newBlog',BlogController.searchTop10)

app.use(router.routes()).use(router.allowedMethods());
// app.post('/login', UserController.login)
app.listen(3003)

 
  