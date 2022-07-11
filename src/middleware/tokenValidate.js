const { Jwt } = require('../utils')
module.exports = function (){
	return async function(ctx, next){	
		// if(ctx.req.url !== '/login'){
			const token = ctx.request.header.authorization;//从请求头的authorization属性中获取token
			if(token){	
				const { valid } = Jwt.verifyToken(token.slice(7));
				if(!valid){
					ctx.body = {
						code: 403,
						msg: '请求被拒绝，token无效或已过期'
					}
				}else{
					await next();
				}
			}else{
				ctx.body = {
					code: 401,
					msg: '请求未授权'
				}
			}
		// }else{
		// 	await next()
		// }
	}
}
