const { Jwt } = require('../utils')
const admin_list = ['laifubin']
module.exports = function (){
	return async function(ctx, next){	
    function isAdmin(token) {
      const { decoded } = Jwt.verifyToken(token.slice(7))
      const name = decoded.name
      return name === 'laifubin'
    }
			const token = ctx.request.header.authorization;//从请求头的authorization属性中获取token
      const { decoded } = Jwt.verifyToken(token.slice(7));
      if(admin_list.includes(decoded.name)){
        await next();
      }else{
        ctx.body = {
          code: 403,
          msg: `用户${decoded.name}没有此操作权限！`
        }
      }
	}
}
