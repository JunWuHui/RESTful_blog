const koa = require('koa')
const error = require('koa-json-error')
const bodyparser = require('koa-bodyparser')
const parameter = require('koa-parameter');
const app = new koa()
const routing = require('./routes')
//数据连接
const { connectionStr } = require('./config')
const mongoose = require('mongoose')
mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
() => {
  console.log('数据连接成功！')
})
mongoose.connection.on('error',console.error)

app.use(error({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));
app.use(bodyparser())
app.use(parameter(app));
routing(app)

app.listen(3000) 