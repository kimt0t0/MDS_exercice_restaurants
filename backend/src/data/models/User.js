const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema({
    fisrtName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-z0-9\-_.]+@[a-z]+\.[a-z]{2,3}$/
    },
    password: {
        type: String,
    required: true
    },
    role: {
        type: String
    }
}, { timestamps: true })

userSchema.pre('save', (next) => {
    const user = this

    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(15, (error, salt) => {
            if (error) {
                throw new Error(error)
            }
            user.password = hash
            return next()
        })
    }
})

userSchema.methods.comparePasswords = (password, callback) => {
    bcrypt.compare(password, this.password, (error, isMatch) => {
        if (error) {
            return callback(error, null)
        }
        return callback(null, isMatch)
    })
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
