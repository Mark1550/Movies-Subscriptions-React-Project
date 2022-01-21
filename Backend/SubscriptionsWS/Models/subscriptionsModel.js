const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 //Creating the Schema for the new subscription objects in the database.
const subscriptionsSchema = new Schema({ 
    memberId: String,
    movies: Array
})

module.exports = mongoose.model('subscriptions', subscriptionsSchema)