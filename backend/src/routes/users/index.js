const { createUser, getUsers, getUserById, updateUserById, deleteUserById } = require('../../controllers/usersController')
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

    router.route('/:id')

    .get(async (req, res) => {
        try {
            const userId = req.params.id
            const user = await getUserById(userId)
            return res.send(user)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    .patch(async (req, res) => {
        try {
            const userId = req.params.id
            const { body } = req
            const updatedUser = await updateUserById(userId, body)
            return res.send(updatedUser)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    .delete(async (req, res) => {
        try {
            const userId = req.params.id
            const deletedUser = await deleteUserById(userId)
            return res.send(`deleted user with id ${userId}`)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    module.exports = router