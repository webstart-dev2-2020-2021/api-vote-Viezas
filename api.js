const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')

const authRouter = require('./routers/auth.js').router
const adminRouter = require('./routers/admin.js').router
const app = express()

mongoose.set('useFindAndModify', false)
mongoose.connect(
  'mongodb+srv://Viezas:sq0zb75NEgJsx6Lw@cluster0.mhwig.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'ERROR: CANNOT CONNECT TO MONGO-DB'))
db.once('open', () => console.log('CONNECTED TO MONGO-DB'))

app.use(helmet())
app.use(express.json())

app.use('/auth/', authRouter) //Route auth
app.use('/admin/', adminRouter) //Route admin

app.listen(3000, () => {console.log('Serveur lancé sur le port 3000, bon développement !');})