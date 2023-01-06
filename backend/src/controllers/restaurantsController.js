const Restaurant = require('../data/models/Restaurant')
const Image = require('../data/models/Image')
const Course = require('../data/models/Course')

const getRestaurants = async () => {
    const restaurants = await Restaurant.find()
    return restaurants
}

const getRestaurantById = async (id) => {
    if (!id) {
        throw new Error('missing restaurant id')
    }
    const restaurant = await Restaurant.findById(id)
    const restaurantObject = restaurant.toObject()
    return restaurantObject
} 

const createRestaurant = async (restaurant) => {

    if (!restaurant) {
        throw new Error('missing data')
    }

    const _restaurant = new Restaurant({
        name: restaurant.name,
        description: restaurant.description,
        address: restaurant.address,
        photo: restaurant.photo,
        plats: restaurant.plats
    })

    const savedRestaurant = await _restaurant.save()
    const savedRestaurantObject = savedRestaurant.toObject()

    return savedRestaurantObject
}

const updateRestaurantById = async (id, restaurant) => {
    if (!id) {
        throw new Error('missing id')
    }
    if (!restaurant) {
        throw new Error('missing restaurant')
    }

    const restaurantUpdate = await Restaurant.findByIdAndUpdate(id, restaurant, {new: true})
    const restaurantObject = restaurantUpdate.toObject()
    return restaurantObject
}

const deleteRestaurantById = async (id) => {
    if (!id) {
        throw new Error('missing id')
    }
    await Image.remove({user: id}).exec()
    await Course.remove({user: id}).exec()
    await Restaurant.findByIdAndDelete(id)
}


module.exports = {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurantById,
    deleteRestaurantById
}