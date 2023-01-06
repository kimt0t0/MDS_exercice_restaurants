const router = require('express').Router()
const { getRestaurants, createRestaurant } = require('../../controllers/restaurantsController')


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

module.exports = router