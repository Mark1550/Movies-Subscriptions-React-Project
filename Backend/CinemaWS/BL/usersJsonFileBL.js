const { readUsersJson, writeUsersJson } = require('../DAL/UsersJsonDAL');

// a function that use the basic read file from the DAL to read the JSON file and return the data
const readUsers = () => {
    const data = readUsersJson()
    return (data)
}

// a functoin that find and return a user ibject by it's id
const getUserByUserID = async (id) => {
    const data = await readUsersJson()
    const user = data.find((elements) => elements.id === id)
    return user
}

// a function that adds a user object to the JSON file
const addUser = async (newUser, id) => {
    const data = await readUsersJson()
    const obj = {
        id: id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        createdDate: newUser.createdDate,
        sessionTimeOut: newUser.sessionTimeOut
    }
    data.push(obj)
    writeUsersJson(data)
}

// a functoin that updates a user in the JSON file
const updateUserJson = async (updatedUser, id) => {
    const data = await readUsersJson()
    const obj = {
        id: id,
        firstName: updatedUser.userJson.firstName,
        lastName: updatedUser.userJson.lastName,
        createdDate: updatedUser.userJson.createdDate,
        sessionTimeOut: updatedUser.userJson.sessionTimeOut
    }
    const index = data.findIndex((element) => element.id === id)
    data.splice(index, 1, obj)
    writeUsersJson(data)
}

// a function that delete a user object by it's id in the JSON file
const deleteUserJson=async(id)=>{
    const data = await readUsersJson()
    const index = data.findIndex((element) => element.id === id)
    data.splice(index, 1)
    writeUsersJson(data)
}
module.exports = { readUsers, getUserByUserID, addUser, updateUserJson,deleteUserJson }