const router = require('express').Router()
const { dirname } = require('path')
const appDir = dirname(require.main.filename)
const { sanatizeFilename } = require('../../../tools/strings')
const multer = require('multer')
const { createFile } = require('../../../controllers/filesController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appDir + '/../files/')
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1E3)
        cb(null, uniquePrefix + '_' + sanatizeFilename(file.originalname))
    }
})

const authorizedTypes = [
  'png',
  'jpeg',
  'jpg',
  'webp',
  'webm',
  'pdf',
  'gif'
]

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const type = file.mimetype.split('/')[1]
        if (authorizedTypes.includes(type)) {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('File must be of type' + authorizedTypes))
        }
    }
})

router.route('/')
    .post(upload.single('file'), async (req, res) => {
        const { file, restaurantId } = req

        try {
            const savedFileObject = await createFile(file, restaurantId)
            return res.send(savedFileObject)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

module.exports = router