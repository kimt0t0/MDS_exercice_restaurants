const Image = require('../data/models/Image')
const Restaurant = require('../data/models/Restaurant')

const createFile = async (file, restaurantId) => {

    if (!file) {
        throw new Error('Missing file')
    }

    const newFile = new Image({
        restaurant: restaurantId,
        path: image.path,
        size: image.size
    })

    const savedFile = await newFile.save()

    if (savedFile) {
        await Restaurant.findByIdAndUpdate(restaurantId,
            {$push: { files: savedFile._id}},
            {new: true, useFindAndModify: false})
    }

    const savedFileObject = savedFile.toObject()
    return savedFileObject
}

module.exports = {
    createFile
}