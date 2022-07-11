const jwt = require('jsonwebtoken');
const URL = 'http://pv.sohu.com/cityjson?ie=utf-8'
const PRIVATE_KEY = 'algsjl23asd3' 

class Jwt {
	static generateToken(payload){
    // expiresIn: 数值单位ms，字符串"2 days", "10h", "7d"
		const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: 60 * 60}, { algorithm: 'RS256' });
		return token;
	}

	static verifyToken(token){
		try{
			const decoded  = jwt.verify(token, PRIVATE_KEY, { algorithm: 'RS256' })
			return { decoded, valid: true};
		} catch(error){
			return { error, valid: false};
		}
	}
}

module.exports = {
  Jwt
}