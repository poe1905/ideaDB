const fs = require('fs')
const path = require('path')
const qiniu = require("qiniu"); //导入七牛
// const qiniu_updata = require(qiniu-js);//导入七牛 上传模块
var fn_upload = async (ctx, next) => {

  // // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // // 创建可读流
  // const reader = fs.createReadStream(file.path);
  // let filePath = path.join(__dirname, '../public/images') + `/${file.name}`;
  // // 创建可写流
  // const upStream = fs.createWriteStream(filePath);
  // // 可读流通过管道写入可写流
  // reader.pipe(upStream);

  ctx.response.body = {
    code: 200,
    msg: 'ok',
    // files: {file:`http://127.0.0.1:3000/images/`+file.name}
  }
}
var get_token = async (ctx, next) => {
  const accessKey = 'Nd2xy-tgYJ05W4Y70Tw3fqIt_mbJij8hcZbq3Q-Z'
  const secretKey = 'PZVH1Wp0myMCjXu1572mD3K3exjh1IhkCvJSqWsB'
  const bucket = 'yiruis' //七牛空间名
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  let options = {
    scope: bucket,
    expires: 3600 * 24
  }
  let putPolicy = new qiniu.rs.PutPolicy(options)
  let uploadToken = putPolicy.uploadToken(mac)
  ctx.response.body = uploadToken ? { code: 200, token: uploadToken } : { code: 400 }
}
module.exports = {
  "POST /upload": fn_upload,
  "GET /getToken": get_token
};
