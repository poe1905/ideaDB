const fs = require('fs')
const user = require('../BD/user.json')

var fn_hello =  async (ctx, next) => {
  
    var body = ctx.request.body;
    // var files = fs.readFile(__dirname + '/controllers');
    // if(body.username === 'admin') return next()

    for (const item of user) {
      if (body.username == item.username && body.password ==item.password) {
        ctx.response.body = {
          code:200,
          msg:'ok',
          token: Date.now()
          
        };
        return next()
      } else {
        // console.log('错误');
        ctx.response.body = {
          code:400,
          msg:'no',
        }
      }
    }
 
    
}

module.exports = {
  "POST /login" : fn_hello
};
