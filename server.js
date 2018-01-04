let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/', function (req, res) {
	res.send('Hello')
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})