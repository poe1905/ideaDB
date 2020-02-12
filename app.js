const Koa = require( 'koa' );
const bodyParser = require('koa-bodyparser');
// 注意require('koa-router')返回的是函数:
const router = require( 'koa-router' )();
const fs = require('fs')
const app = new Koa(); 
app.use(bodyParser());

// // log 请求 URL:
app.use(async (ctx, next) => {
    // console.log(`\x1B[2m\x1B[44m ${ctx.request.method} \x1B[0m ${ctx.request.url} ...`);
    if (ctx.request.method =='GET'){
        console.log(`\x1B[2m\x1B[44m ${ctx.request.method} \x1B[0m ${ctx.request.url} ...`);
        
    }else {
        
        console.log(`\x1B[2m\x1B[42m ${ctx.request.method} \x1B[0m ${ctx.request.url} ...`);
    }

    await next();
});

// 添加路由器中间件:
app.use(router.routes());
// console.log = signale.success

var files = fs.readdirSync(__dirname + '/controllers');
var js_files = files.filter((f)=>{
    return f.endsWith('.js')
    
}) 
// 处理每个js文件:
for (var f of js_files) { 
    // 导入js文件:
    let mapping = require(__dirname + '/controllers/' + f)
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4)
            router.get(path, mapping[url])
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5)
            router.post(path, mapping[url])
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`)
        }
    }
}

app.listen(3000);
console.log( '请打开 端口访问: \x1B[7m http://127.0.0.1:3000','\x1B[0m');