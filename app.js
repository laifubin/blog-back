const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('@koa/router')

const UserController = require('./src/login.js')
const BlogController = require('./src/blog.js')
const MenuControl = require('./src/menu.js')
const CategoryController = require('./src/category.js')

const tokenValidate = require('./src/middleware/tokenValidate')
const isAdminValidate = require('./src/middleware/isAdminValidate')

const router = new Router()
const app = new Koa()

app.use(bodyParser())
router.post('/register',UserController.register)
router.post('/login',UserController.login)

router.get('/category/list',CategoryController.getCategoryList)

// 文章增删改查
router.post('/blog/search',BlogController.search)
router.get('/blog/searchTitle',BlogController.searchTitle)
router.get('/blog/details',BlogController.details)

// 以下的路由是需要token校验的
router.use(tokenValidate()) 
router.post('/menu',MenuControl.getMenu)
router.post('/refreshToken',UserController.refreshToken)

// 以下的路由是只有admin可以访问
router.use(isAdminValidate())
router.post('/blog/update',BlogController.update)
router.get('/blog/delete',BlogController.delete)
router.post('/blog/updateStatus',BlogController.updateStatus)

app.use(router.routes()).use(router.allowedMethods());
app.listen(3003)

 
  