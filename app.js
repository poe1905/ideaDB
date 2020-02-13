const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const fs = require('fs')
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());


// // log 请求 URL:
app.use(async (ctx, next) => {
    if (ctx.request.method == 'GET') {
        console.log(`\x1B[2m\x1B[44m ${ctx.request.method} \x1B[0m ${ctx.request.url} ...`);
    } else {
        console.log(`\x1B[2m\x1B[42m ${ctx.request.method} \x1B[0m ${ctx.request.url} ...`);
    }
    
    await next();
});

// 添加路由器中间件:
app.use(router.routes());

const controller  = require('./controller')
app.use(controller());



app.listen(3000);
console.log('请打开 端口访问: \x1B[7m http://127.0.0.1:3000', '\x1B[0m');