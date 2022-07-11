const { promisify } = require('node:util')
var dayjs = require('dayjs')
const { runSql, db } = require('./db');

class BlogController {
  // 查询文章
  static async search(ctx, next) {
    const { title, category, status, current = 1, size = 10 } = ctx.request.body;
    let sqlStr = `SELECT * FROM blog WHERE title LIKE'%${title}%'`
    let totalStr = `SELECT count(*) FROM blog WHERE title LIKE'%${title}%'`

    if (category !== undefined) {
      sqlStr += ` AND category=${category}`
      totalStr += ` AND category=${category}`
    }
    if (status !== undefined) {
      sqlStr += ` AND status=${status}`
      totalStr += ` AND status=${status}`
    }

    const total = await promisify(db.all.bind(db))(totalStr)
    sqlStr += ` ORDER BY updateTime DESC LIMIT ${size} OFFSET ${size * (current - 1)};`

    const blogs = await promisify(db.all.bind(db))(sqlStr)
    return ctx.body = {
      code: 200,
      data: blogs,
      total: total[0]['count(*)'],
      msg: "操作成功"
    };
  }

  // 查询文章的id、title、category
  static async searchTitle (ctx, next) {
    const { current } = ctx.request.query
    let sqlStr = `SELECT id, title, category FROM blog WHERE status=1 ORDER BY createTime DESC LIMIT 20 OFFSET ${ 20 * (current - 1)};`

    const blogs = await promisify(db.all.bind(db))(sqlStr)
    return ctx.body = {
      code: 200,
      data: blogs,
      msg: "操作成功"
    };
  }

  // 根据id查询文章详情
  static async details (ctx, next) {
    const id = ctx.request.query.id
  
    if (!id) return ctx.body = {
      code: 400,
      msg: "缺少id参数"
    } 
    let sqlStr = `SELECT * FROM blog WHERE id='${id}';`

    const blogs = await promisify(db.get.bind(db))(sqlStr)
    return ctx.body = {
      code: 200,
      data: blogs,
      msg: "操作成功"
    };
  }

  // 修改文章
  static async update(ctx, next) {
    const data = ctx.request.body
    const { title, content, status, author, location, category } = data
    let id = data.id
    const updateTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    // 没有传id，新增操作
    if (id === undefined) {
      id = Date.now()
      id += ''
  
      // id, title, content, status, createTime, updateTime, location, author,
      await promisify(db.run.bind(db))('INSERT INTO blog VALUES (?,?,?,?,?,?,?,?,?);', [id, title, content, status, updateTime, updateTime, location, author, category])
    } else { // 有id，修改操作
      await promisify(db.run.bind(db))('UPDATE blog SET title=?, content=?, status=?, updateTime=?, author=?, category=? WHERE id=?;', [title, content, status, updateTime, author, category, id])
    }
    return ctx.body = {
      code: 200,
      msg: "操作成功"
    };
  }
  // 删除文章
  static async delete(ctx, next) {
    const id = ctx.request.query.id
  
    if (!id) return ctx.body = {
      code: 400,
      msg: "缺少id参数"
    }
    await runSql(`DELETE FROM blog WHERE id='${id}';`)
    return ctx.body = {
      code: 200,
      msg: "操作成功"
    }
  }
  // 删除文章
  static async updateStatus(ctx, next) {
    const { id, status } = ctx.request.body
    if (!id) return ctx.body = {
      code: 400,
      msg: "缺少id参数"
    }
    await await promisify(db.run.bind(db))('UPDATE blog SET status=? WHERE id=?;', [status, id])
    return ctx.body = {
      code: 200,
      msg: "操作成功"
    }
  }

}

module.exports = BlogController;
