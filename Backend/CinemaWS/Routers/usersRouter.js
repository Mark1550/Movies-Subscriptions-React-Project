const express = require('express')
const usersDAL = require('../DAL/UserDAL')
const usersBL = require('../BL/usersBL')
const permissionBL = require('../BL/permissionsJsonFIleBL')
const usersJsonBL = require('../BL/usersJsonFileBL')

//creating a router using express
const router = express.Router()

//declering the route for the GET method | a function that gets all the users using the DAl's functions and utils for the JSONs
router.route('/').get(async (req, res) => {
    try {
        const users = await usersDAL.getAllUsers();
        const permissions = await permissionBL.readPermissions()
        const usersJson = await usersJsonBL.readUsers()
        const obj = {
            users: users,
            usersJson: usersJson,
            permissions: permissions
        }

        return res.json(obj)
    }
    catch (error) {
        return res.json(error)
    }
})

// declering the route for the GET method by id | a function that gets a user by it's ID using the DAl's functions and utils for the JSONs
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id
        const user = await usersDAL.getUserById(id)
        const userJson = await usersJsonBL.getUserByUserID(id)
        const permissions = await permissionBL.getPermissinosByUserID(id)
        const obj = {
            user: user,
            userJson: userJson,
            permissions: permissions
        }
        return res.json(obj)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the POST method | a functoin that adds a user to the database using the DAl's functions and utils for the JSONs
router.route('/').post(async (req, res) => {
    const newUser = req.body;
    const allUsers = await usersDAL.getAllUsers();
    if (await usersBL.checkIfExist(allUsers, newUser)) {
        return res.json("false")
    } else {
        await usersDAL.addUser(newUser)
        const id = await usersBL.findId(newUser)
        await usersJsonBL.addUser(newUser, id)
        await permissionBL.addPermissionsToJson(newUser, id)
    }
})

//declering the route for the PUT method | a function that updates a user in the database by it's ID using the DAl's functions and utils for the JSONs
router.route('/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;
        const result = await usersDAL.updateUser(id, updatedUser)
        await usersJsonBL.updateUserJson(updatedUser, id)
        await permissionBL.updatePermissionsJson(updatedUser, id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the DELETE method | a function that deletes a user by it's ID using the DAL's functions and the utils for the JSONs
router.route('/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await usersDAL.deleteUser(id);
        await usersJsonBL.deleteUserJson(id)
        await permissionBL.deletePermissionsJson(id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

module.exports = router;