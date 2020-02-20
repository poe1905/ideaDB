var { list } = require('../utils/sqlconfig');


//处理文章添加
var fn_addlist = async (ctx, next) => {
  var { data } = ctx.request.body;
  data.item = Date.now() + ''
  data.id = Number(Math.random().toString().substr(3, 5) + Date.now()).toString(36)
  data.content = data.content.replace(/\"/g, "'")
  // data --
  //  title: '爱拉夫一批批',
  // type: '0',
  // secret: false,
  // content: '<p>haoduyoudu</p>',
  // item: '1581835048108',
  // id: '38ffiz0rufg0'

  const sql = `INSERT INTO list (title,type,secret,content,item,id) VALUES ("${data.title}","${data.type}","${data.secret}","${data.content}","${data.item}","${data.id}")`
  console.log(sql);
  function asyncRes () {
    return new Promise((resolve, reject) => {
      //"${data.username}"  查询字符串的时候要将变量使用字符串的形式传入条件
      list.sql(sql, (err, results) => {
        console.log(err);
        console.log(results);
        if (!err) console.log('增加成功');
        resolve(results)
      });
    })
  }
  await asyncRes()

  ctx.response.body = {
    code: 200,
    msg: 'ok'
  };
}
//获取文章列表
var fn_getlist = async (ctx, next) => {
  // console.log(ctx.request.querystring,111111);
  //血泪教育啊    明明人家koa2 提供了获取格式化参数的 aip 我非要自己来  我是不是蠢
  // const type = ctx.request.querystring.split('&') //id=1akd5cz478cg&page=1&count=10  //[ 'id=1akd5cz478cg', 'page=1', 'count=10' ]
  // let obj = {}
  // type.forEach(item => {
  //   let arr = item.split('=')
  //   obj[arr[0]] = arr[1]
  // });
  // console.log(obj); //{ id: '1akd5cz478cg', page: '1', count: '10' }

  const type = ctx.query// ==>{ id: '1akd5cz478cg', page: '1', count: '10' }
  function asyncRes () {
    return new Promise((resolve, reject) => {
      //判断是否传参  有传参使用参数 查询, 未传参返回所有
      if (type) {
        list.limit({ where: `type="${type.id}"`, number: +type.page, count: +type.count }, (err, results) => {
          console.log(err);
          // console.log(results.length);
          resolve(results)
        });

      } else {
        list.find((err, results) => resolve(results));
      }
    })
  }
  const body = await asyncRes()

  if (body.length < type.count ) {

    // 当发送请求的页码,小于查询到的数据 则返回这一条 数据
    ctx.response.body = {
      code: 200,
      msg: 'no next one',
      data: body
    };
  } else {
      ctx.response.body = {
    code: 200,
    msg: 'ok',
    data: body
  };
  }
}


module.exports = {
  'GET /getlist': fn_getlist,
  'POST /addlist': fn_addlist
};
