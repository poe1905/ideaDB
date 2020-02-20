const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const serve = require('koa-static');
const fs = require('fs')
const path = require('path')
// const bodyParser = require('koa-bodyparser'); //处理pust请求
const koaBody = require('koa-body');//处理文件上传
const app = new Koa();
require('./utils/sqlconfig');//引入配置信息
// studentModel.insert({id:'001',name:'张三10',completion:30},(err,results)=>{
//   console.log(err);
//   console.log(results);
//   if(!err) console.log('增加成功');
// });

//静态资源托管
const home   = serve(path.join(__dirname)+'/public/');
app.use(home);

//处理文件上传
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));

// app.use(router.get("/public",home))
// // log 请求 URL:
app.use(async (ctx, next) => {
    if (ctx.request.method == 'GET') {
        console.log(`\x1B[2m\x1B[44m ${ctx.request.method} \x1B[0m ${ctx.request.url} ...`);
    } else {
        console.log(`\x1B[2m\x1B[42m ${ctx.request.method} \x1B[0m ${ctx.request.url} ...`);
    }
    
    await next();
});


//设置后端跨域请求  判断预检请求
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });






// 添加路由器中间件:
app.use(router.routes());

const controller  = require('./controller')
app.use(controller());



app.listen(3000);
console.log('请打开 端口访问: \x1B[7m http://127.0.0.1:3000', '\x1B[0m');