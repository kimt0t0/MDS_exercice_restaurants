const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const port = 3000
const app = express()

app.use(helmet())
app.use(cors())

const connect = require('./data/helpers/db')
connect()

// Paramétrage d'Express pour le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', require('./routes'))

app.listen(port, () => {
    console.log(`¤----- App listening on port ${port} -----¤`)
})