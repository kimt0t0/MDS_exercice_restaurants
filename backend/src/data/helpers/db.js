const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
    const username = process.env.MONGO_USERNAME
    const password = process.env.MONGO_PASSWORD
    const host = process.env.MONGO_HOST
    try {
    await mongoose.connect(`mongodb+srv://${username}:${password}@${host}?retryWrites=true&w=majority`)
    console.log('¤----- Database connected ! -----¤')
    }
    catch (error) {
      console.error('Error' + JSON.stringify(error))
    }
}

module.exports = connect