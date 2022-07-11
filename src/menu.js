const menuList = [
  { name: 'Blog', label: '博客管理', path: '/blog'}
]

module.exports = class MenuControl {
  static getMenu (ctx, next) {
    return ctx.body = {
      code: 200,
      msg: '操作成功',
      data: menuList
    }
  }
}
 