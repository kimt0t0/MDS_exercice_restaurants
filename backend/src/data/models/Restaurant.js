const mongoose = require('mongoose')

const { Schema } = mongoose

const restaurantSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    // photos: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Image'
    // }],
    photos: {
        type: String
    },
    plats: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, { timestamps: true })

module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema)
