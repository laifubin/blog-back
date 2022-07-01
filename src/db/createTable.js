const { runSql, db } = require('./index')
const dayjs = require('dayjs')
// 创建用户表
// runSql('CREATE TABLE user (name TEXT PRIMARY KEY NOT NULL, password TEXT);')

// 创建博客文章表
runSql('CREATE TABLE IF NOT EXISTS blog (id TEXT PRIMARY KEY NOT NULL, title TEXT, content TEXT, status NUMBER CHECK(status==0 OR status==1), createTime TEXT, updateTime TEXT, location TEXT, author TEXT);')

// insertBlogData()

db.exec(sql, console.log);
// 删除表
// runSql('DROP TABLE blog;')
db.close()

function insertBlogData () {
  var sql = "";
  for (var i = 0; i < 50; i++) {
    const index = i + 1
    const status = i % 2
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    sql += `INSERT INTO blog VALUES('${index}', 'title${index}', 'content${index}',${status}, '${time}', '${time}', '广东省广州市', 'ljy' );`
  }
}