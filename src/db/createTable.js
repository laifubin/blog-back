const { runSql, db } = require('./index')

// 创建用户表
// runSql('CREATE TABLE user (name TEXT PRIMARY KEY NOT NULL, password TEXT)')

// 创建博客文章表
runSql('CREATE TABLE blog (id TEXT PRIMARY KEY NOT NULL, title TEXT, content TEXT, status BOOLEAN, createTime TEXT, location TEXT, author TEXT)')

db.close()
