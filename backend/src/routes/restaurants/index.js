const { getRestaurants, getRestaurantById, createRestaurant, updateRestaurantById, deleteRestaurantById } = require('../../controllers/restaurantsController')
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

        .patch(async (req, res) => {
            try {
                const restaurantUpdate = await updateRestaurantById(req.params.id, req.body)
                return res.send(restaurantUpdate)
            } catch (error) {
                return res.status(500).send(error)
            }
        })

        .delete(async (req, res) => {
            try {
                await deleteRestaurantById(req.params.id)
                return res.send(`User with id: ${req.params.id} has been deleted`)
            } catch (error) {
                return res.status(500).send(error)
            }
        })

module.exports = router