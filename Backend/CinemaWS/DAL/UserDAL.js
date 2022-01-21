const usersModel = require('../Models/usersModel')//linking the studentModel file to this file 

// a function that gets all the users from the database using the usersModel
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        usersModel.find({}, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

// a function that get a user by it's id from the database using the usersModel
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        usersModel.findById(id, (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data)
            }

        })
    })
}

// a function that adds a user to the database using the usersModel
const addUser = (newuser) => {
    const newUser = {
        username: newuser.username,
        password: ''
    }
    return new Promise((resolve, reject) => {
        const user = new usersModel(newUser)
        user.save((err) => {
            if (err)
                reject(err)
            else
                resolve("User was added successfully")
        })
    })
}

// a functoin that updates a user in the databases using the usersModel
const updateUser = (id, updatedUser) => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndUpdate(id, updatedUser.user, (err) => {
            if (err)
                reject(err)
            else
                resolve("User was updated successfully")
        })
    })
}

// a function that deletes a user in the database using the usersModel
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        usersModel.findByIdAndDelete(id, (err) => {
            if (err)
                reject(err)
            else
                resolve("User was deleted successfully")
        })
    })
}

module.exports = { getAllUsers, addUser, deleteUser, updateUser, getUserById}
