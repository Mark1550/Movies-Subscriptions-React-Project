const { getAllMoviesFromAPI } = require('../BL/moviesBL')
const moviesModel = require('../Models/moviesModel')

//a function that gets all the movies 
const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        moviesModel.find({}, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

// a function that gets a movie by it's ID using the moviesModel
const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
        moviesModel.findById(id, (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data)
            }

        })
    })
}

// a function that adds a movie to the database using the moviesModel
const addMovie = (newMovie) => {
    return new Promise((resolve, reject) => {
        const movie = new moviesModel(newMovie)
        movie.save((err) => {
            if (err)
                reject(err)
            else
                resolve("Member was added successfully")
        })
    })
}

// a function that updates a movie in the database by it's ID using the moviesModel
const updateMovie = (id, updatedMovie) => {
    return new Promise((resolve, reject) => {
        moviesModel.findByIdAndUpdate(id, updatedMovie, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("Movie was updated successfully")

            }
        })
    })
}

// a function that deletes a movie by it's ID using the moviesModel
const deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        moviesModel.findByIdAndDelete(id, (err) => {
            if (err)
                reject(err)
            else
                resolve("Movie was deleted successfully")
        })
    })
}

// a function that gets all the movies from the database, delete them, get the new movies from the API and loades them into the database
const getStartMovies = async () => {
    const movies = await getAllMovies()
    for (const movie of movies)
        await deleteMovie(movie._id)
    const newMovies = await getAllMoviesFromAPI()
    for (const newMovie of newMovies.data) {
        const date = new Date(newMovie.premiered)
        const newobj = {
            name: newMovie.name,
            geners: newMovie.genres,
            image: newMovie.image?.medium,
            premiered: date
        }
        await addMovie(newobj)
    }
}

module.exports = { getAllMovies, addMovie, deleteMovie, updateMovie, getMovieById, getStartMovies }
