const axios = require('axios').default;
const URL = 'http://pv.sohu.com/cityjson?ie=utf-8'

function getLocation () {
  return axios.get(URL).then(res => res.data)
}
// 22 天
module.exports = {
  getLocation
}