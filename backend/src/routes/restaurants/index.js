const router = require('express').Router()
const { getRestaurants } = require('../../controllers/restaurantsController')

router.route('/')
    .get(async function (req, res) {
        const restaurants = await getRestaurants()
        return res.send(restaurants)
    })

module.exports = router