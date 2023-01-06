const Restaurant = require('../data/models/Restaurant')

const getRestaurants = async () => {
    const restaurants = await Restaurant.find()
    return restaurants
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

module.exports = {
    getRestaurants,
    createRestaurant
}