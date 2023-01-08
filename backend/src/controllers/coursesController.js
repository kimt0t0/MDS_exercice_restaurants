const Course = require('../data/models/Course')
const Image = require('../data/models/Image')
const Restaurant = require('../data/models/Restaurant')

const getCourses = async () => {
    const courses = await Course.find()
    return courses
}

const getCourseById = async (id) => {
    if (!id) {
        throw new Error('missing restaurant id')
    }
    const course = await Course.findById(id)
    const courseObject = course.toObject()
    return courseObject
} 

const createCourse = async (course, restaurantId) => {

    if (!course) {
        throw new Error('missing course data')
    }
    if (!restaurantId) {
        throw new Error('missing restaurant id')
    }

    const _course = new Course({
        name: course.name,
        description: course.description,
        photos: course.photos,
        price: course.price,
        restaurant: restaurantId
    })
    const courseCreated = await _course.save()
    if (courseCreated.restaurant) {
        await Restaurant.findByIdAndUpdate(courseCreated.restaurant,
        { $push: { files: courseCreated._id } },
        { new: true, useFindAndModify: false })
    }

    return courseCreated
}

const updateCourseById = async (id, course) => {
    if (!id) {
        throw new Error('missing id')
    }
    if (!course) {
        throw new Error('missing course')
    }

    const courseUpdate = await Course.findByIdAndUpdate(id, course, {new: true})
    const courseObject = courseUpdate.toObject()
    return courseObject
}

const deleteCourseById = async (id) => {
    if (!id) {
        throw new Error('missing id')
    }
    await Image.remove({user: id}).exec()
    await Course.remove({user: id}).exec()
    await Restaurant.findByIdAndUpdate(id).populate(courses)
}


module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById
}