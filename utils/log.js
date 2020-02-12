import color from './color';
// log 请求 URL:
export default  (ctx, next) => {
  // console.log(`\x1B[2m\x1B[44m ${ctx.request.method} \x1B[0m ${ctx.request.url} ...`);

  for (const iterator of color) {
    console.log(iterator);
  }
  console.log(`\x1B[2m\x1B[42m ${ctx.request.method} \x1B[0m ${ctx.request.url} ...`);

  await next();
}