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
        throw new Error('missing data')
    }

    const _course = new Course({
        name: course.name,
        description: course.description,
        photos: course.photos,
        price: course.price,
        restaurant: restaurantId
    })
    const savedCourse = await _course.save()
    const savedCourseObject = savedCourse.toObject()

    if (savedCourse) {
        console.log('ajout du plat au restaurant')
        await Restaurant.findOneByIdAndUpdate(restaurantId,
            { $push: { courses: savedCourse._id } },
            { new: true, useFindAndModify: false })
        console.log('plat ajouté au restaurant')
    }

    return savedCourseObject
}

const updateCourseById = async (id, restaurant) => {
    if (!id) {
        throw new Error('missing id')
    }
    if (!restaurant) {
        throw new Error('missing restaurant')
    }

    const restaurantUpdate = await Restaurant.findByIdAndUpdate(id, restaurant, {new: true})
    const restaurantObject = restaurantUpdate.toObject()
    return restaurantObject
}

const deleteCourseById = async (id) => {
    if (!id) {
        throw new Error('missing id')
    }
    await Image.remove({user: id}).exec()
    await Course.remove({user: id}).exec()
    await Restaurant.findByIdAndDelete(id)
}


module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById
}