const koa = require('koa');
const route = require('koa-router');
const morgan = require('koa-morgan');
const fs = require('fs')

require('dotenv').config()

const app = new koa();
const router = new route()


// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + '/access.log',
                                             { flags: 'a' })

// setup the logger

process.env.ENV = 'development' ? app.use(morgan('dev')) : app.use(morgan('combined', { stream: accessLogStream }))

router.get('koala', '/', (ctx:any) => {
  ctx.body = "Welcome! To the Koala Book of Everything!"
})


app.use(router.routes())
  .use(router.allowedMethods())

app.listen(8008,():void => console.log('Koa listening on port 8008'));
