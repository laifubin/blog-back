const crypto = require("crypto")
const { promisify } = require('node:util')
const { Jwt } = require("./utils")
const { db, querySql } =  require('./db/index.js')

class UserController {
  // 用户注册
  static async register (ctx, next) {
    const { name, password } = ctx.request.body
    if (!name || !password) {
      return ctx.body = {
        code: 400, 
        msg: "参数不合法"
      }
    }
    const pwd = crypto.createHash('md5').update(password).digest('hex')
    await promisify(db.run.bind(db))('INSERT OR REPLACE INTO user VALUES (?, ?)', [name, pwd])
    return ctx.body = {
      code: 200,
      msg: `用户${name}注册成功`,
      data: null
    }
  }
  // 用户登录
  static async login(ctx, next) {
    const { name, password } = ctx.request.body;
   
    if (!name || !password) {
      return ctx.body = {
        code: 400, 
        msg: "参数不合法"
      }
    }
    const users = await querySql('SELECT * FROM user')
    const result = users.find(item => item.name === name && item.password === crypto.createHash('md5').update(password).digest('hex'))
    if (result) {
      // 生成token
      const token = Jwt.generateToken({ name: result.name })

      return ctx.body = {
        code: 200,
        msg: "登录成功",
        data: { name, token }
      };
    } else {
      return ctx.body = {
        code: 201,
        msg: "用户名或密码错误", 
        data: null
      };  
    }
  }

  // 刷新token
  static refreshToken (ctx, next) {
    const token = ctx.request.header.authorization
    const { decoded, valid } = Jwt.verifyToken(token.slice(7))
    if(valid){	
      const name = decoded.name
      const token = Jwt.generateToken({ name })

      return ctx.body = {
        code: 200,
        msg: "刷新成功！",
        data: { name, token }
      }
    }
  }
}

module.exports = UserController;
