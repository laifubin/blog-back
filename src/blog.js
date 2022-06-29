
class blogController {
  // 新增文章
  static async add(ctx, next) {
    const data = ctx.request.body;
    console.log('ctx', data) 
    
    if (result) {
      return ctx.body = {
        code: 200,
        message: "操作成功"
      };
    }
  }

  // 查询文章
  static async search(ctx, next) {
    const blogs = await querySql('SELECT * FROM blog')

  }
  // 修改文章
  static async edit(ctx, next) {
    
  }
  // 删除文章
  static async delete(ctx, next) {
    
  }
}

module.exports = UserController;
