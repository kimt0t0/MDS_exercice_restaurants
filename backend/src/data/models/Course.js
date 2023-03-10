const mongoose = require('mongoose')

const { Schema } = mongoose

const courseSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    photos: {
        type: Array
    },
    price: {
        type: Number
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
}, { timestamps: true })

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema)
