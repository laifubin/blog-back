const { runSql, db } = require('./index')
const dayjs = require('dayjs')
// 创建用户表
// runSql('CREATE TABLE user (name TEXT PRIMARY KEY NOT NULL, password TEXT);')

// 创建博客文章表
// runSql('CREATE TABLE IF NOT EXISTS blog (id TEXT PRIMARY KEY NOT NULL, title TEXT, content TEXT, status NUMBER CHECK(status==0 OR status==1), createTime TEXT, updateTime TEXT, location TEXT, author TEXT);')

// 给已存在的表添加新的一列
// runSql('ALTER TABLE blog ADD COLUMN category TEXT;')
// insertBlogData()
const sql = insertCategory()
runSql(sql)
// 创建文章类目表
// runSql('CREATE TABLE category (id TEXT PRIMARY KEY NOT NULL, label TEXT, value NUMBER);')

// 删除表
// runSql('DROP TABLE blog;')
db.close()

function insertCategory () {
  var sql = "";
  const categoryList = ['HTML', 'CSS', 'JavaScript', 'nodejs', 'vue', 'react', 'Linux']
  for (var i = 8; i < 50; i++) {
    // const index = i + 1
  }
  // sql += `INSERT INTO category VALUES('${8}', 'Webpack', ${8});`
  // sql += `INSERT INTO category VALUES('${9}', '面试', ${9});`
  sql += `INSERT INTO category VALUES('${11}', 'TypeScript', ${11});`
  // sql += `UPDATE blog SET category=8 WHERE status=0;`
  // sql += `DELETE FROM category WHERE id='${50}';`
  return sql
}
function insertBlogData () {
  var sql = "";
  for (var i = 0; i < 50; i++) {
    const index = i + 1
    const status = i % 2
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    sql += `INSERT INTO blog VALUES('${index}', 'title${index}', 'content${index}',${status}, '${time}', '${time}', '广东省广州市', 'ljy' );`
  }
}