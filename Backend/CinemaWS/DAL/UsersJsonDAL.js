const jFile=require('jsonfile')
const path ='../jsonFiles/users.json'

// a simple read json file function
const readUsersJson = () => jFile.readFile(path)

// a simple write json file function
const writeUsersJson = (newArr) => jFile.writeFile(path,newArr)

module.exports = { readUsersJson, writeUsersJson }