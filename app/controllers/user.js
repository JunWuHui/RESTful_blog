const jsonwebtoken = require('jsonwebtoken')

class UsersCtl {
  async find(ctx) {
    ctx.body="这是用户列表"
  }
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.body = user;
  }
  //注册账户
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) { ctx.throw(409, '用户已经占用'); }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }
  async update(ctx) {}
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.status = 204;
  }
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