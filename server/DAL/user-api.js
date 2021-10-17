const User = require('../database/models/user')

const newUser = async (name, email, password) => {
    const user = await new User({ "email": email, "password": password, "name": name })
    console.log(user);
    user.save()
    return { name: user.name, id: user._id };
}

const login = async (email, password) => {
    try {
        const isUser = await User.findOne({ email: email, password: password }).exec();
        return ({ name: isUser.name, id: isUser._id })
    } catch (error) {
        throw new Error('Unknown error');
    }
}

module.exports = {
    newUser,
    login
}