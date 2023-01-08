const User = require('../data/models/User')

const createUser = async (user) => {
    if (!user.email || !user.password) {
        throw new Error('missing data')
    }
    const _user = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role
    })

    const savedUser = await _user.save()
    console.log('saved user: ', savedUser)
    const savedUserObject = savedUser.toObject()
    console.log('user object: ', savedUserObject)
    delete savedUserObject.password
    return savedUserObject
}

module.exports = {
    createUser

}