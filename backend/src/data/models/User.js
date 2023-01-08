const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')


const userSchema = new Schema({
    firstName: {
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
        type: String,
        enum: ['admin', 'classic'],
        default: 'classic'
    }
}, { timestamps: true })



userSchema.pre('save', async function (next) {
    const user = this
    console.log("encrypting passord...")
    if (user.isModified('password') || user.isNew) {
        try {
            const salt = await bcrypt.genSalt(15)
            const hash = await bcrypt.hash(user.password, salt)
            user.password = hash
            return next()
        } catch (error) {
            throw new Error(error)
        }
    }
})

userSchema.methods.comparePasswords = async (password) => {
    const isPasswordValid = await bcrypt.compare(password, this.password)
    return isPasswordValid
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
