const helmet = require('helmet')
const cors = require('cors')
const express = require('express')

const port = 3000
const app = express()

app.use(helmet())
app.use(cors())

const connect = require('./data/helpers/db')
connect()

// Paramétrage d'Express pour le body et le JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/courses', require('./routes/courses'))
app.use('/upload', require('./routes/files/upload'))

app.listen(port, () => {
    console.log(`¤----- App listening on port ${port} -----¤`)
})