const mysql = require('mysql-ithm');
const config = {
  host: 'localhost',//数据库地址
  port: '3306',
  user: 'root',//用户名，没有可不填
  password: 'root',//密码，没有可不填
  database: 'nian'//数据库名称
}
mysql.connect(config);
// app.use(bodyParser());
// connection.on('error', function (err) {
//   logger.error('db error', err);
//   if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//     logger.error('db error执行重连:' + err.message);
//     handleDisconnection();
//   } else {
//     throw err;
//   }
// });
process.on('uncaughtException', (error) => {
  // console.log('它出现了一个错误',error);
  if(error.code =='PROTOCOL_CONNECTION_LOST'){
    mysql.connect(config);
    console.log('报一个错开心一下');
  }
});
 
//如果table表格存在则连接，不存在则自动创建
let type = mysql.model('type');
let user = mysql.model('user');
let list = mysql.model('list');

console.log('链接数据库成功');
module.exports = {
  type,
  user,
  list
}