const fs = require('fs')

//处理文件请求
function addMapping (router, mapping) {
  //遍历数组对象 /将每一个对象按照格式分别注册到router上面
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
      console.log(`controllers文件夹中,导出对象路径错误: ${url}`)
    }
  }
}

function addControllers (router ,controllers_dir) {
  var files = fs.readdirSync(__dirname + `/${controllers_dir}`);
  var js_files = files.filter((f) => {
    return f.endsWith('.js')

  })
  // 处理每个js文件:
  for (var f of js_files) {
    // 导入js文件:
    let mapping = require(__dirname + `/${controllers_dir}/` + f)
    //处理文件请求
    addMapping(router, mapping)
  }
}
// addControllers(router)

module.exports = function (dir) {
  let
    controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};
