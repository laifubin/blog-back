const crypto = require("crypto"),
  jwt = require("jsonwebtoken");

const { runSql, querySql } =  require('./db/index.js')

// runSql(`INSERT INTO user values ('laifubin', '123456')`)
// TODO:使用数据库
// 这里应该是用数据库存储，这里只是演示用
let userList = [
  {name: 'laifubin', password: '14e1b600b1fd579f47433b88e8d85291'}
];

class UserController {
  // 用户登录
  static async login(ctx, next) {
    const data = ctx.request.body;
    console.log('ctx', data)
    // console.log(crypto.createHash('md5').update('e10adc3949ba59abbe56e057f20f883e').digest('hex'), 999)
     
    
    if (!data.name || !data.password) {
      return ctx.body = {
        code: 400, 
        message: "参数不合法"
      }
    }
    const users = await querySql('SELECT * FROM user')
    const result = userList.find(item => item.name === data.name && item.password === crypto.createHash('md5').update(data.password).digest('hex'))
    if (result) {
      // 生成token
      const token = jwt.sign(  
        {
          name: result.name
        },
        "test_token", // secret
        { expiresIn: 60 * 60 } // 过期时间：60 * 60 s
      );
      return ctx.body = {
        code: 200,
        message: "登录成功",
        data: {
          token,
          users
        }
      };
    } else {
      return ctx.body = {
        code: 200,
        message: "用户名或密码错误",
        data: null
      };  
    }
  }
}

module.exports = UserController;
