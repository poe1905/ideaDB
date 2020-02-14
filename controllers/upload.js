const fs = require('fs')
const path = require('path')

var fn_upload = async (ctx, next) => {

  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, '../public/images') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);

  ctx.response.body = {
    code: 200,
    msg: 'ok',
    files: {file:`http://127.0.0.1:3000/images/`+file.name}
  } 
}

module.exports = {
  "POST /upload": fn_upload
};
