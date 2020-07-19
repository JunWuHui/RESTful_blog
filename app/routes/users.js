const Router = require('koa-router')
const jsonwebtoken = require('jsonwebtoken')
const router = new Router({prefix:'/users'})
const { find, create, findById, login } = require('../controllers/user')
const { secret } = require('../config')

const auto = async(ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer', '')
  try {
    const user = jsonwebtoken.verify(token, secret)
  } catch (error) {
    ctx.throw(401,token.message)
  }
  await next()
}

router.get('/', find);
router.post('/', create);
router.get('/:id', findById)
//登陆
router.post('/login', login);
module.exports = router