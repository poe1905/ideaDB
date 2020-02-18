var { user, type, list } = require('../utils/sqlconfig');
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
      data: userinfo,
      token: Date.now()
    };
  } else {
    ctx.response.body = {
      code: 401,
      msg: '密码输入错误,请重新输入',
    }
  }


}

//获取登陆信息
fn_logininfo = async (ctx, next) => {
  //获取项目总数
  function asyncRes () {
    return new Promise((resolve, reject) => {
      type.find((err, results) => {
        // console.log(err);
        // console.log(results);
        resolve(results)
      });
    })
  }
  //查询近期的项目
  function asynclist () {
    var weekAgo = Date.now() - 604800000
    console.log(weekAgo);
    return new Promise((resolve, reject) => {
      list.find(`item > ${weekAgo}`,(err, results) => {
        // console.log(err);
        // console.log(results);
        resolve(results)
      });
    })
  }
  //查询
  function project () {
    return new Promise((resolve, reject) => {
      type.find('completion = 1', (err, results) => {
        // console.log(err);
        // console.log(results);
        resolve(results)
      });
    })
  }
  function logd () {

    const sql = `
    select name as 'type',COUNT(*) as 'sum' from type left join list
    on type.id=list.type where name is not null
    group by name`
    return new Promise((resolve, reject) => {
      type.sql(sql, (err, results) => {
        // console.log(err);
        // console.log(results);
        resolve(results)
      });
    })
  }
  const types = await asyncRes() //总共的项目
  const completion = await project() //总共完成的项目
  const hahah = await logd() //项目总览
  const sunlist = await asynclist() //项目总览
  console.log(hahah);
  var max = { sum: 0 }
  for (const key in hahah) {
    const element = hahah[key];
    if (max.sum < element.sum) {
      max = element
    }
  }

  ctx.response.body = {
    code: 200,
    msg: 'ok',
    data: {
      types: types.length,
      completion: completion.length,
      maxtype: max.sum,
      sunlist: sunlist.length
    }
  };
}

module.exports = {
  "POST /login": fn_login,
  "GET /logininfo": fn_logininfo
};
