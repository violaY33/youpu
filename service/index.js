const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const search = require('./router/search')
const details = require('./router/details')
const hot = require('./router/hot')
const page = require('./router/page')
const related = require('./router/related')
const cate = require('./router/cate')
const cates = require('./router/cates')
const test = require('./router/test')

app.listen(9090)
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.json({
        msg: '尤谱'
    })
})

//路由
app.use(search)
app.use(details)
app.use(hot)
app.use(page)
app.use(related)
app.use(cate)
app.use(cates)
app.use(test)