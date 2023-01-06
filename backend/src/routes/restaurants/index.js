const { getRestaurants, getRestaurantById, createRestaurant } = require('../../controllers/restaurantsController')
const router = require('express').Router()


router.route('/')

    .get(async (req, res) => {
        const restaurants = await getRestaurants()
        return res.send(restaurants)
    })

    .post(async (req, res) => {
        try {
            const restaurantCreated = await createRestaurant(req.body)
            return res.send(restaurantCreated)
        } catch(error) {
            return res.status(500).send(error)
        }
    })

    router.route('/:id')
    .get(async (req, res) => {
        try {
            const restaurant = await getRestaurantById(req.params.id)
            return res.send(restaurant)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

module.exports = router