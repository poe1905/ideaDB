var fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
      <form action="/signin" method="post">
          <p>用户名: <input name="name" value="koa"></p>
          <p>密码: <input name="password" type="password"></p>
          <p><input type="submit" value="登陆"></p>
      </form>`;
}

var fn_signin = async (ctx, next) => {
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
}
module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin
};
