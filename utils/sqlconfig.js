const mysql = require('mysql-ithm');
const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  //数据库名称
  database: 'nian'
}
mysql.connect(config);

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