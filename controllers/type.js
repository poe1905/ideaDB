var { type } = require('../utils/sqlconfig');
// 获取文章类型
var fn_gettype = async (ctx, next) => {
  // console.log(ctx.request.querystring);
  const id = ctx.request.querystring
  function asyncRes () {
    return new Promise((resolve, reject) => {
      //"id="${id}""  查询字符串的时候要将变量使用字符串的形式传入条件
      if (id){
        type.find(`id="${id}"`,(err, results) => resolve(results));
        
      }else{
        type.find((err, results) => resolve(results));
      }
    })
  }

  // //调用 数据库请求
  let userinfo = await asyncRes()
  // console.log(userinfo);
  ctx.response.body = { 
    code:200,
    msg: 'ok',
    data: userinfo
  }

}
// 删除文章类型
var fn_deletetype = async (ctx, next) => {
  const id = ctx.request.querystring
  function asyncRes () {
    return new Promise((resolve, reject) => { 
        type.delete(`id="${id}"`,(err, results) => resolve(results));
        
 
    })
  }

  // // //调用 数据库请求
  let userinfo = await asyncRes()
  console.log(`收到影响的数据为${userinfo.affectedRows} `);//收到影响的数据为
  ctx.response.body = { 
    code:200,
    msg: 'ok',
    data:  {
      code: 200,
      msg: '删除成功'
    }
  }

}


// 添加文章类型
var fn_settype = async (ctx, next) => {
  var body = ctx.request.body;//获取类型名称
  body.startTime = Date.now()
  body.id = Number(Math.random().toString().substr(3,5) + Date.now()).toString(36)
  body.completion = body.completion? 1 :0
  body.secret = body.secret? 1 :0
  console.log(body);
  function asyncRes () {
    return new Promise((resolve, reject) => {
      try {
        type.insert(body,(err,results)=>{
          console.log(err);
          // console.log(results);
          if(!err) console.log('增加成功');
          resolve(results )
      });
      } catch (e) {
        reject(e)
      }
    })
  }
  const err = await asyncRes() 
  console.log(err , "我是错误");
  ctx.response.body = {
    code: 200,
    msg: '增加成功'
  };
}

//修改文章类型
var fn_altertype = async (ctx, next) => {
  const id = ctx.request.querystring
  var body = ctx.request.body;
  body.completion = body.completion? 1 :0
  body.secret = body.secret? 1 :0
  console.log(body ,id);
  function asyncRes () {
    return new Promise((resolve, reject) => {
      //"${body.username}"  查询字符串的时候要将变量使用字符串的形式传入条件
      type.update(`id ="${id}"`, body,(err,results)=>{
        console.log(err);
        console.log(results);
        if(!err) console.log('修改成功');
        resolve(results )
    });
    })
  }
    await asyncRes() 
 
  ctx.response.body = {
    code: 200,
    msg: '增加成功',
    data:body
  };
}
module.exports = {
  'GET /type': fn_gettype,
  'GET /deletetype': fn_deletetype,
  'POST /settype': fn_settype,
  'POST /altertype': fn_altertype,
}