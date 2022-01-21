import { getAllUsers, getUserByID } from '../DAL/usersDAL'

//a function that checks if the user exist
const checkIfExist = async (newuser) => {
    const users = await getAllUsers()
    const check = users.users.find((user) => user.username.toUpperCase() === newuser.username.toUpperCase() && user.password === newuser.password)
    if (check !== undefined)
        return true
    return false
}

// a function that finds user's id by it's username
const findID = async (username) => {
    const allUsers = (await getAllUsers()).users
    const user = allUsers.find((element) => element.username.toUpperCase() === username.toUpperCase())
    if (user !== undefined)
        return user._id.valueOf()
}

// a functoin that find and return a user by it's id
const findUserByUserName = async (username) => {
    const allUsers = (await getAllUsers())
    const user = allUsers.users.find((element) => element.username.toUpperCase() === username.toUpperCase())
    const id = user._id
    const foundUser = await getUserByID(id)
    return foundUser
}

// a function that checks if a username is allready exists
const checkIfUsernameExist = async (username) => {
    const users = await getAllUsers()
    const check = users.users.find((user) => user.username.toUpperCase() === username.toUpperCase())
    if (check !== undefined)
        return true
    return false
}

// a function that checks if a password is allready exist
const checkIfPasswordExist = async (id) => {
    const user = (await getUserByID(id)).user
    if (user.password !== '')
        return true
    else
        return false
}

// afunction that return true if the user is the admin and false if it isn't
const checkIfAdmin = async (user) => {
    const users = await getAllUsers()
    if (users.users[1] === undefined)
        return true
    const index = users.users.findIndex((element) => element._id === user._id)
    if (index === 0)
        return true
    else
        return false
}

// a funciton that get a bools arr and converts it to string permissions arr and returns it
const convertArrToPermissions = (arr) => {
    const PermissionsArr = ['View Subscriptions', 'Create Subscriptions', 'Delete Subscriptions', 'Update Subscriptions', 'View Movie', 'Create Movie', 'Delete Movie', 'Update Movie']
    const newArr = [];
    let index = 0
    for (let element of arr) {
        if (element)
            newArr.push(PermissionsArr[index])
        index++
    }
    return newArr
}

// a funciton that get a strings permissions arr and converts it to bool permissions arr and returns it
const convertPermissionsToArr = (permissions) => {
    const newArr = [false, false, false, false, false, false, false, false]
    const PermissionsArr = ['View Subscriptions', 'Create Subscriptions', 'Delete Subscriptions', 'Update Subscriptions', 'View Movie', 'Create Movie', 'Delete Movie', 'Update Movie']
    for (const per of PermissionsArr) {
        const element = permissions.find((permission) => permission === per)
        if (element !== undefined) {
            const index = PermissionsArr.findIndex((per) => per === element)
            newArr[index] = true
        }
    }
    return newArr
}

// a function that check if any of the subscriptions releated permissions were pressed and retrun a bool accordingly
const SubscriptionsPermissionsPressed = (arr) => {
    let bool = false
    const newArr = arr.slice(0, 4)
    for (const element of newArr) {
        if (element === true)
            bool = true
    }
    return bool
}

// a function that check if any of the movies releated permissions were pressed and retrun a bool accordingly
const MoviesPermissionsPressed = (arr) => {
    let bool = false
    const newArr = arr.slice(4, 8)
    for (const element of newArr) {
        if (element === true)
            bool = true
    }
    return bool
}

// a function that checks if the session of the user has ran out
const checkIfSessionTimeOut = async (id) => {
    const user = await getUserByID(id)
    const userSessionMili = (user.userJson?.sessionTimeOut) * 60000
    const createdMili = (new Date(user.userJson?.createdDate)).getTime()
    const todayMili = (new Date()).getTime()
    if ((todayMili - createdMili) < userSessionMili)//if there is still time return true else return false
        return true
    else
        return false
}

export { checkIfSessionTimeOut, findUserByUserName, checkIfExist, findID, checkIfPasswordExist, checkIfUsernameExist, checkIfAdmin, convertArrToPermissions, convertPermissionsToArr, SubscriptionsPermissionsPressed, MoviesPermissionsPressed }    