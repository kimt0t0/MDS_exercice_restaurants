const { getCourses, getCourseById, createCourse, updateCourseById, deleteCourseById } = require('../../controllers/coursesController')
const router = require('express').Router()


router.route('/')

    .get(async (req, res) => {
        const courses = await getCourses()
        return res.send(courses)
    })

    .post(async (req, res) => {
        try {
            const courseCreated = await createCourse(req.body, '63bab05bdbc5d576d5bbd72b')
            return res.send(courseCreated)
        } catch(error) {
            return res.status(500).send(error)
        }
    })

    router.route('/:id')

        .get(async (req, res) => {
            try {
                const course = await getCourseById(req.params.id)
                return res.send(course)
            } catch (error) {
                return res.status(500).send(error)
            }
        })

        .patch(async (req, res) => {
            try {
                const courseUpdate = await updateCourseById(req.params.id, req.body)
                return res.send(courseUpdate)
            } catch (error) {
                return res.status(500).send(error)
            }
        })

        .delete(async (req, res) => {
            try {
                await deleteCourseById(req.params.id)
                return res.send(`User with id: ${req.params.id} has been deleted`)
            } catch (error) {
                return res.status(500).send(error)
            }
        })

module.exports = router