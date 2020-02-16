var { user } = require('../utils/sqlconfig');
var fn_login = async (ctx, next) => {
  var body = ctx.request.body; //取出表单中的 用户名 
  //包装 读取数据库请求 --不然koa 无法返回相应数据
  function asyncRes () {
    return new Promise((resolve, reject) => {
      //"${body.username}"  查询字符串的时候要将变量使用字符串的形式传入条件
      user.find(`username = "${body.username}"`, (err, results) => {
        const user = results[0] || {}
        resolve(user)
      });
    })
  }


  //调用 数据库请求
  let userinfo = await asyncRes()
  //判断 是否查询到用户数据
  if (userinfo.password == undefined) return ctx.response.body = { code: 401, msg: `没有此用户` }
  //判断密码是否正确
  if (body.password == userinfo.password) {
    ctx.response.body = {
      code: 200,
      msg: 'ok',
      token: Date.now()
    };
  } else {
    ctx.response.body = {
      code: 401,
      msg: '密码输入错误,请重新输入',
    }
  }


}

module.exports = {
  "POST /login": fn_login
};
