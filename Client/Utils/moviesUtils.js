import { getMemberByID } from "../DAL/membersDAL"
import { deleteMovie, getAllMovies, getMovieByID } from "../DAL/moviesDAL"
import { getAllSubscriptions, updateSubscriptionById } from "../DAL/subscriptionsDAL"

// a function that finds all now watched movies for the member
const findNotWtchedMovies = async (watchedMovies) => {
    const movies = await getAllMovies()
    const newArr = []
    for (let movie of movies) {
        let bool = false
        for (let watchedMovie of watchedMovies) {
            if (movie._id === watchedMovie.movieId)
                bool = true
        }
        if (!bool)
            newArr.push(movie)
    }
    return newArr
}

// a function that returns true if someone has watched the movie and flase if not
const checkIfSomeoneWatched = async (movieId) => {
    let bool = false
    const Movie = await getMovieByID(movieId)
    const subs = await getAllSubscriptions()
    for (let sub of subs) {
        for (let movie of sub.movies) {
            if (movie.movieId === Movie._id) {
                bool = true
            }
        }
    }
    return bool
}

// a function that returnes an array with all who watched the movie
const checkWhoWatched = async (movieId) => {
    const arr = []
    const subs = await getAllSubscriptions()
    for (let sub of subs) {
        for (let movie of sub.movies) {
            if (movie.movieId === movieId) {
                let member = await getMemberByID(sub.memberId)
                let obj = {
                    name: member.name,
                    date: movie.date
                }
                arr.push(obj)
            }
        }
    }
    return arr
}

// a function that return movies that meet the search input 
const searchMovies = (allMovies, input) => {
    const arr = []
    for (let movie of allMovies) {
        if (movie.name.toUpperCase().includes(input.toUpperCase()))
            arr.push(movie)
    }
    return arr
}

// a functoin that deletes a movie from a subscription's movies array in the database
const deleteMovieFromSub = async (id) => {
    const subs = await getAllSubscriptions()
    for (let sub of subs) {
        for (let movie of sub.movies) {
            if (movie.movieId === id) {
                let newMovies = sub.movies
                let index = newMovies.findIndex((movie) => movie.movieId === id)
                newMovies.splice(index, 1)
                let obj = { ...sub, movies: newMovies }
                await updateSubscriptionById(obj, sub.memberId)
            }
        }
    }
}

// a function that finds a movie by it's name
const findMovieByName = async (name) => {
    const movies = await getAllMovies()
    const movie = movies.find((movie) => movie.name === name)
    return movie;
}

// a function that deletes a movie from the database and from the subscriptoin that watched it
const deleteMovieUtils = async (id) => {
    await deleteMovieFromSub(id)
    await deleteMovie(id)
}

export { deleteMovieUtils, findMovieByName, checkWhoWatched, deleteMovieFromSub, findNotWtchedMovies, checkIfSomeoneWatched, searchMovies }    