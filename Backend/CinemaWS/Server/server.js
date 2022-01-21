const express = require('express')//linking the express package
const cors = require('cors') //linking the cors package
require('../DB/UsersDB') //linking the database to the file
const usersRouter = require('../Routers/usersRouter') //linking the users router to the file
const moviesRouter = require('../Routers/moviesRouter') //linking movies the router to the file
const membersRouter = require('../Routers/membersRouter') //linking the members router to the file
const subscriptionsRouter = require('../Routers/subscriptionsRouter') //linking the subscriptions router to the file

const app = express(); //middleware
const port = 8001; //Declering the port number

app.use(cors());//middleware
app.use(express.json());//middleware
app.use(express.urlencoded({ extended: true }));//middleware

app.use('/users', usersRouter) // connecting the path to the users router
app.use('/movies', moviesRouter) // connecting the path to the movies router
app.use('/members', membersRouter) // connecting the path to the members router
app.use('/subscriptions', subscriptionsRouter) // connecting the path to the subscriptions router

app.listen(port, () => { // listening the server to the port that was declered
    console.log(`server is listening at http://localhost:${port}`)
})
