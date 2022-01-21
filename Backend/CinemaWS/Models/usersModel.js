const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Creating the Schema for the new users objects in the database.
const usersSchema = new Schema({  
    username:String,
    password:String,
})

module.exports = mongoose.model('users', usersSchema)