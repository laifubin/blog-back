const { querySql } =  require('./db/index.js')

class CategoryController {
  // 获取分类列表
  static async getCategoryList(ctx, next) {
    const list = await querySql('SELECT * FROM category') 
    return ctx.body = {
      code: 200,
      msg: "操作成功",
      data: list
    };
  
  }
}

module.exports = CategoryController;
