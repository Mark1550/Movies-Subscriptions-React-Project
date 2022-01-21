const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Creating the Schema for the new movie objects in the database.
const movieSchema = new Schema({  
    name:String,
    geners:Array,
    image:String,
    premiered:Date
})

module.exports = mongoose.model('movies', movieSchema)