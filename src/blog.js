const {promisify} = require('node:util')
var dayjs = require('dayjs')
const { getLocation } = require('./utils')
const { querySql, runSql, db } = require('./db');

class BlogController {
  // 查询文章
  static async search(ctx, next) {
    const { title, status, current = 1, size = 10 } = ctx.request.body;
    console.log('ttt', title, status)
    let sqlStr = 'SELECT * FROM blog'
    if (title && status !== undefined) sqlStr += ` WHERE title='${title}' AND status=${status}`
    else if (title)  sqlStr += ` WHERE title='${title}'`
    else if (status !== undefined)  sqlStr += ` WHERE status=${status}`
    sqlStr += ` ORDER BY updateTime DESC LIMIT ${size} OFFSET ${size * (current - 1)};`

    const blogs = await promisify(db.all.bind(db))(sqlStr)
    return ctx.body = {
      code: 200,
      data: blogs,
      message: "操作成功"
    };
  }

  // 查询最近10篇文章
  static async searchTop10 (ctx, next) {
    let sqlStr = 'SELECT id, title FROM blog WHERE status=1 ORDER BY createTime DESC LIMIT 10;'

    const blogs = await promisify(db.all.bind(db))(sqlStr)
    return ctx.body = {
      code: 200,
      data: blogs,
      message: "操作成功"
    };
  }

  // 根据id查询文章详情
  static async details (ctx, next) {
    const id = ctx.request.query.id
  
    if (!id) return ctx.body = {
      code: 400,
      message: "缺少id参数"
    } 
    let sqlStr = `SELECT * FROM blog WHERE id='${id}';`

    const blogs = await promisify(db.get.bind(db))(sqlStr)
    return ctx.body = {
      code: 200,
      data: blogs,
      message: "操作成功"
    };
  }

  // 修改文章
  static async update(ctx, next) {
    const data = ctx.request.body
    const { title, content, status, author } = data
    let id = data.id
    const updateTime = dayjs(id).format('YYYY-MM-DD HH:mm:ss');
    // 没有传id，新增操作
    if (id === undefined) {
      id = Date.now()
      id += ''
      const data = await getLocation()
      const location = data.split('cname')[1].slice(4, -3)
  
      // id, title, content, status, createTime, updateTime, location, author,
      await promisify(db.run.bind(db))('INSERT INTO blog VALUES (?,?,?,?,?,?,?,?);', [id, title, content, status, updateTime, updateTime, location, author])
    } else { // 有id，修改操作
      await promisify(db.run.bind(db))('UPDATE blog SET title=?, content=?, status=?, updateTime=?, author=? WHERE id=?;', [title, content, status, updateTime, author, id])
    }
    return ctx.body = {
      code: 200,
      message: "操作成功"
    };
  }
  // 删除文章
  static async delete(ctx, next) {
    const id = ctx.request.query.id
  
    if (!id) return ctx.body = {
      code: 400,
      message: "缺少id参数"
    }
    await runSql(`DELETE FROM blog WHERE id='${id}';`)
    return ctx.body = {
      code: 200,
      message: "操作成功"
    }
  }

}

module.exports = BlogController;
