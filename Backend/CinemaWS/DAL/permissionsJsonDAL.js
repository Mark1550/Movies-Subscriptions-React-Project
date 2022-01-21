const jFile = require('jsonfile')
const path = '../jsonFiles/permissions.json'

// a simple read json file function
const readPermissionsJson = () => jFile.readFile(path)

// a simple write json file function
const writePermissionsJson = (newArr) => jFile.writeFile(path, newArr)

module.exports = { readPermissionsJson, writePermissionsJson }