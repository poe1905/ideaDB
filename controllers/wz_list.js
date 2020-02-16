var { list } = require('../utils/sqlconfig');


//处理文章添加
var fn_addlist = async (ctx, next) => {
  var {data} = ctx.request.body;
  data.item = Date.now()+''
  data.id = Number(Math.random().toString().substr(3,5) + Date.now()).toString(36)
  data.content = data.content.replace(/\"/g,"'")
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
      list.sql(sql,(err,results)=>{
        console.log(err);
        console.log(results);
        if(!err) console.log('增加成功');
        resolve(results )
    });
    })
  }
    await asyncRes()

  ctx.response.body = {
    code:200,
    msg:'ok'
  };
}
//获取文章列表
var fn_getlist = async (ctx, next) => {
  // var body = ctx.request.body;//获取类型名称
  // body.startTime = Date.now()
  // body.id = Number(Math.random().toString().substr(3,5) + Date.now()).toString(36)
  function asyncRes () {
    return new Promise((resolve, reject) => {
      list.find((err,results)=>{
        // console.log(err);
        // console.log(results);
        resolve(results )
    });
    })
  }
   const body =  await asyncRes() 


  ctx.response.body = {
    code:200,
    msg: 'ok',
    data:body
  };
}


module.exports = {
  'GET /getlist': fn_getlist,
  'POST /addlist': fn_addlist
};
