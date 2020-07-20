const koa = require('koa')
const error = require('koa-json-error')
//const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')
const path = require('path');
const app = new koa()
const routing = require('./routes')
//数据连接
const { connectionStr } = require('./config')
const mongoose = require('mongoose')
mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
},
() => {
  console.log('数据连接成功！')
})
mongoose.connection.on('error',console.error)

app.use(koaStatic(path.join(__dirname, 'public')));

app.use(error({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true,
  },
}));

app.use(parameter(app));
routing(app)

app.listen(3000) 