const Restaurant = require('../data/models/Restaurant')

const getRestaurants = async function() {
    const restaurants = await Restaurant.find()
    return restaurants
}

module.exports = {
    getRestaurants
}