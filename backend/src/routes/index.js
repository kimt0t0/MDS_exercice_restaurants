const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/restaurants', require('./restaurants'))
router.use('/courses', require('./courses'))
router.use('/upload', require('./files/upload'))

module.exports = router