const express = require('express')
const helmet = require('helmet')

const authRouter = require('./routers/auth.js').router
const app = express()

app.use(helmet())
app.use(express.json())

app.use('/auth/', authRouter)
app.listen(3000, () => {console.log('Serveur lancé sur le port 3000, bon développement !');})

console.log('Hello World!');