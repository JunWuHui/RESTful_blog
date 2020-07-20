const Router = require('koa-router')
//const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const router = new Router({prefix:'/users'})
const { find, create, findById, delete:del, login, update, checkOwner } = require('../controllers/user')
const { secret } = require('../config')

// const auth = async(ctx, next) => {
//   const { authorization = '' } = ctx.request.header
//   const token = authorization.replace('Bearer ', '')
//   try { 
//     const user = jsonwebtoken.verify(token, secret)
//     ctx.state.user = user
//   } catch (error) {
//     ctx.throw(401,token.message)
//   }
//   await next()
// }

const auth = jwt({secret})
 
router.get('/', find);
router.post('/', create);
router.get('/:id', findById)
router.get('/:id', findById)
router.delete('/:id', auth, checkOwner, del)
router.patch('/:id', auth, checkOwner, update)
//登陆
router.post('/login', login);
module.exports = router