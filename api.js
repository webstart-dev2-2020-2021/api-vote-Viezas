const dotenv = require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const crypto = require('crypto')

const authRouter = require('./routers/auth.js').router
const adminRouter = require('./routers/admin.js').router
const voteRouter = require('./routers/vote.js').router
const authAdmin = require('./middlewares/authAdmin.js')
const authUser = require('./middlewares/authUser.js')
const app = express()

const {DB_USER, DB_NAME, DB_PASSWORD} = process.env
global.JWT_SECRET = crypto.randomBytes(50).toString('hex')
console.log(JWT_SECRET);

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mhwig.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'ERROR: CANNOT CONNECT TO MONGO-DB'))
db.once('open', () => console.log('CONNECTED TO MONGO-DB'))

app.use(helmet())
app.use(express.json())

app.use('/auth/', authRouter)   //Route auth
app.use('/admin/', authAdmin, adminRouter) //Route admin
app.use('/vote/', authUser, voteRouter) //Route vote

app.listen(3000, () => {console.log('Serveur lancé sur le port 3000, bon développement !')})