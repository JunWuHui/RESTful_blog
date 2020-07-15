const koa = require('koa')
const app = new koa()
const router = require('koa-router')

const userRouter = new router({prefix:'/users'})

userRouter.get('/',async (ctx) => {
  ctx.body="这是用户列表"
})

userRouter.get('/:id',async (ctx) => {
  ctx.body=`这是${ctx.params.id}`
})

app.use(userRouter.routes());   /*启动路由*/
app.use(userRouter.allowedMethods());
/*
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头 
 *
 */

app.listen(3000)