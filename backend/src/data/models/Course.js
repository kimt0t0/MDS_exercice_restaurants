const mongoose = require('mongoose')

const { Schema } = mongoose

const courseSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    photo: {
        type: Array
    },
    price: {
        type: Number
    },
    restaurant: {
        type: /* relation one to many */
    }
}, { timestamps: true })

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema)
