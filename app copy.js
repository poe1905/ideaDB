const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(bodyParser());

// add url-route:
router.get('/hello/:name/ab', async (ctx, next) => {
 
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1> `;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>用户名: <input name="name" value="koa"></p>
            <p>密码: <input name="password" type="password"></p>
            <p><input type="submit" value="登陆"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`登陆的名称: ${name}, 密码为: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>你好, ${name}等你好久了!</h1>`;
    } else {
        ctx.response.body = `<h1>登陆失败</h1>
        <p><a href="/">返回登陆</a></p>`;
    }
});

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');