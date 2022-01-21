const express = require('express')//linking the express package
const cors = require('cors') //linking the cors package
require('../DB/SubscriptionsDB') //linking the database to the file
const memberRouter = require('../Routers/membersRouter') //linking the members router to the file
const moviesRouter = require('../Routers/moviesRouter') //linking the movies router to the file
const subscriptionsRouter = require('../Routers/subscriptionsRouter') //linking the subscriptions router to the file
const { getStartMembers } = require('../DAL/membersDAL') //linking the function that gets the first 10 members
const { getStartMovies } = require('../DAL/moviesDAL') // linking the function that get the first 240 movies
const { deleteAllSubscriptionsFromDB } = require('../BL/subscriptionsBL')// linking the functoin that deletes all the subscriptions from the website

const app = express(); //middleware
const port = 8000; //Declering the port number

app.use(cors());//middleware
app.use(express.json());//middleware
app.use(express.urlencoded({ extended: true }));//middleware

app.use('/members', memberRouter) // connecting the path to the members router
app.use('/movies', moviesRouter) // connecting the path to the movies router
app.use('/subscriptions', subscriptionsRouter) // connecting the path to the subscriptions router

getStartMembers() // using the functino to get the first 10 members from the API and save them to the database
getStartMovies() // using the functino to get the first 240 movies from the API and save them to the database
deleteAllSubscriptionsFromDB() // using the function that deletes all the subscriptions from the databased

app.listen(port, async () => { // listening the server to the port that was declered
    console.log(`server is listening at http://localhost:${port}`)
})
