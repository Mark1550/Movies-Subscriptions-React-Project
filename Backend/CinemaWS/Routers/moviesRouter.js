const express = require('express')
const { getAllMovies, getMovieByID, addMovie, updateMovieById, deleteMovie } = require('../DAL/moviesDAL')

//creating a router using express
const router = express.Router()

//declering the route for the GET method | a function that gets all the movies using the DAL's functoins
router.route('/').get(async (req, res) => {
    try {
        const movies = await getAllMovies()
        return res.json(movies)
    }
    catch (error) {
        return res.json(error)
    }
})

// declering the route for the GET method by id | a functoin that gets a movie by it's ID using the DAL's functions
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await getMovieByID(id)
        return res.json(movie)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the POST method | a functoin that adds a movie to the database using the DAL's functoins
router.route('/').post(async (req, res) => {
    const newMovie = req.body;
    const result = await addMovie(newMovie)
})

//declering the route for the PUT method | a function that updates a movie in the database by it's ID using the DAL's functions
router.route('/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMovie = req.body;
        const result = await updateMovieById(updatedMovie, id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the DELETE method | a function that deletes a movie by it's ID using the DAL's functions
router.route('/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteMovie(id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

module.exports = router;