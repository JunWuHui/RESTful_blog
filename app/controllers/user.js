const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const { secret } = require('../config');

class UsersCtl {
  //查看全部用户
  async find(ctx) {
    ctx.body=await User.find()
  }
  //查找用户
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.body = user;
  }
  //新建账户
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) { ctx.throw(409, '用户已经占用'); }
    const user = await new User(ctx.request.body).save()
    ctx.body = {user};
  }
  //修改用户
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false }
    });
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.body = user;
  }
  //权限
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, '没有权限'); }
    await next();
  }
  //删除用户
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.status = 204;
  }
  //登陆
  async login(ctx) {
    ctx.verifyParams({ 
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) { ctx.throw(401, '用户名或密码不正确'); }
    const { _id, name } = user;
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' });
    ctx.body = { token };
  }
}

module.exports = new UsersCtl()