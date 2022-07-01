
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('blog_back.sqlite')
 
//执行sql语句
const runSql = async (sql) => {
  return new Promise(async (resolve, reject) => {
    db.run(sql, (err) => {
      console.log('sql', sql)
      if(err) {
        reject(err)
      }else resolve()
    })
  })
}
 
//查询
const querySql = async (sql) => {
  return new Promise(async (resolve, reject) => {
    db.all(sql, function (err, rows) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}
 
module.exports = {
  runSql,
  querySql,
  db
}