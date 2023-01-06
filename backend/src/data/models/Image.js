const mongoose = require('mongoose')

const { Schema } = mongoose

const imageSchema = new Schema ({
    path: {
        type: String
    },
    size: {
        type: Number
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})

module.exports = mongoose.models.Image || mongoose.model('Image', imageSchema)