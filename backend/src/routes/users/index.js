const { createUser, getUsers } = require('../../controllers/usersController')
const router = require('express').Router()

router.route('/')

    .post(async (req, res) => {
        try {
            console.log('creating user...')
            const userCreated = await createUser(req.body)
            console.log('created user: ', userCreated)
            return res.send(userCreated)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    .get(async (req, res) => {
        try {
            const users = await getUsers()
            return res.send(users)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    module.exports = router