const { getAllUsers } = require("../DAL/UserDAL")

// a function that find and return a user by it's id
const findId = async (user) => {
    const allUsers = await getAllUsers()
    const foundUser = allUsers.find((obj) => obj.username === user.username)
    return foundUser._id.valueOf()
}

// a function that checks if a user allready axists in the database
const checkIfExist = async (allUsers, newUser) => {
    if ((allUsers.find((user) => user.username === newUser.username)) === undefined)
        return false
    return true
}
module.exports = { findId, checkIfExist }