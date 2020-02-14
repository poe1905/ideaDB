var fs = require('fs');

// 获取文章类型
var fn_gettype = async (ctx, next) => {
  const type = require(`../BD/type.json`)
  ctx.response.body = type;
}
// 添加文章类型
var fn_settype = async (ctx, next) => {
  var body = ctx.request.body;//获取类型名称
  const path = __dirname + `/../BD/type.json` //写数据的路径
  const type = require(`../BD/type.json`)
  type.length
  type.push({ [type.length]: body.name })
  const jsonstr = JSON.stringify(type)

  // 写入路径
  fs.writeFile(path, jsonstr, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('----------修改成功-------------');
    } 
  })
  ctx.response.body = type;
}


//处理文章添加
var fn_addlist = async (ctx, next) => {
  var body = ctx.request.body;
  const path = __dirname + `/../BD/list.json`
  var list = require('../BD/list.json')


  body.data.item = Date.now()
  body.data.id = (Date.now() * Math.random() + '').replace(/\./g, '')


  //将修改后的内容写入文件
  list.push(body.data)
  const jsonstr = JSON.stringify(list)

  fs.writeFile(path, jsonstr, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('----------修改成功-------------');
    }
  })
  ctx.response.body = {
    code:200,
    msg:'ok',
  };
}
//获取文章列表
var fn_getlist = async (ctx, next) => {
  const type = require(`../BD/list.json`)

  ctx.response.body = type;
}


module.exports = {
  'GET /type': fn_gettype,
  'POST /settype': fn_settype,
  'GET /getlist': fn_getlist,
  'POST /addlist': fn_addlist
};
