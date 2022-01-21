const { readPermissionsJson, writePermissionsJson } = require('../DAL/permissionsJsonDAL');

// a function that use the basic read function from the DAL
const readPermissions = () => {
    const data = readPermissionsJson()
    return (data)
}

// a function that get's an id and return's a permission object accordingly
const getPermissinosByUserID = async (id) => {
    const data = await readPermissionsJson()
    const permissions = data.find((elements) => elements.id === id)
    return permissions
}

// a function that add a permission object to the JSON file
const addPermissionsToJson = async (newUser, id) => {
    const data = await readPermissionsJson()
    const newobj = {
        id: id,
        permissions: newUser.permissions
    }
    data.push(newobj)
    writePermissionsJson(data)
}

// a function that updates permission object by it's id
const updatePermissionsJson = async (updatedUser, id) => {
    const data = await readPermissionsJson()
    const obj = {
        id: id,
        permissions: updatedUser.permissions.permissions
    }
    const index = data.findIndex((element) => element.id === id)
    data.splice(index, 1, obj)
    writePermissionsJson(data)
}

// a function that deletes permission from the JSON file
const deletePermissionsJson=async(id)=>{
    const data = await readPermissionsJson()
    const index = data.findIndex((element) => element.id === id)
    data.splice(index, 1)
    writePermissionsJson(data)
}

module.exports = { readPermissions, getPermissinosByUserID, addPermissionsToJson, updatePermissionsJson,deletePermissionsJson }