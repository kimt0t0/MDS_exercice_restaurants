const router = require('express').Router()
const { loginUser } = require('../../controllers/authController')

router.route('/login')
    .post(async (req, res) => {
        const credentials = req.body
        try {
            const result = await loginUser(credentials)
            return res.send(result)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

module.exports = router