const fs = require('fs')
const user = require('../BD/user.json')

var fn_hello =  async (ctx, next) => {
    var body = ctx.request.body;
    console.dir(ctx.request.body);
    // var files = fs.readFile(__dirname + '/controllers');
    // if(body.username === 'admin') return next()
    console.log(user);

    user.forEach((item ,index) => {
      if (body.username === item.username && body.password ===item.password) {
        ctx.response.body = {
          code:200,
          msg:'ok',
          token: Date.now()
        };
        next()
      } else {
        ctx.response.body = {
          code:400,
          msg:'no',
        };
        next()
      }
    });
    
}

module.exports = {
  "POST /login" : fn_hello
};
