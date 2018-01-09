const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('*', (req, res) => {
  switch (req.path) {
    case '/types':
      if (req.query.language === 'en') res.send({ types: ['修理厂_en', '4S店_en', '保险公司_en', '个人_en', '其他_en'] })
      else res.send({ types: ['修理厂', '4S店', '保险公司', '个人', '其他'] })
      break
    case '/areas':
      if (req.query.language === 'en') res.send({ areas: [{ title: 'China', summary: '+86', }, { title: 'Taiwan', summary: '+886', }, { title: 'Hong Kong', summary: '+852', }, { title: 'Malaysia', summary: '+60', }] })
      else res.send({ areas: [{ title: 'China_cn', summary: '+86', }, { title: 'Taiwan_cn', summary: '+886', }, { title: 'Hong Kong_cn', summary: '+852', }, { title: 'Malaysia_cn', summary: '+60', }] })
      break
    default:
    // console.log(req.path)
    // console.log(req.query)
  }
})

app.post('*', (req, res) => {
  console.log(req.body)
})

app.listen(10000, 'localhost', () => {
  console.log('server in local:10000')
})