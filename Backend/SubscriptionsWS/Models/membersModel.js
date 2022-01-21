const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Creating the Schema for the new members objects in the database.
const memberSchema = new Schema({  
    name:String,
    email:String,
    city:String,
})

module.exports = mongoose.model('members', memberSchema)