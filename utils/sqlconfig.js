const mysql = require('mysql-ithm');

 mysql.connect({
  host: 'localhost',//数据库地址
  port:'3306',
  user: 'root',//用户名，没有可不填
  password: 'root',//密码，没有可不填
  database: 'nian'//数据库名称
});
// app.use(bodyParser());


//  ,{
//   id:String,
//   name:String,
//   completion:Number,
//   imageUrl:String,
//   secret:Boolean,
//   startTime:Number,
//   endTime:Number
// } 
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