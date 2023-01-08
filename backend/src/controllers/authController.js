const jwt = require('jsonwebtoken')
const User = require('../data/models/User')


const loginUser = async (credentials, callback) => {

    if (!credentials.email || !credentials.password) {
        throw new Error('Invalid credentials')
    }

    const user = await User.findOne({ email: credentials.email })

    if (!user) {
        throw new Error('Invalid email')
    }

    const isMatch = await user.comparePassword(credentials.password)
    if (isMatch) {
        console.log("it's a match !")
        const payload = {
            id: user.id,
            role: user.role
        }
        console.log("payload: ", payload)
        const token = await jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '30d' })
        console.log("token: ", token)
        const _user = user.toObject()
        delete _user.password
        console.log("user: ", _user)
        
        return {
            user: _user,
            token
        }
            
    } else {
        throw new Error('Invalid credentials')
    }
}


module.exports = { loginUser }