const mongoose = require('mongoose')

const { Schema } = mongoose
 nom
- description
- adresse
- photo (upload)
- plats : Plats
const restaurantSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    adresse: {
        type: String
    },
    photo: {
        type: Array
    },
    plats: {
        type: mongoose.SchemaType.ObjectId
    }
}, { timestamps: true })

module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema)
