const axios = require('axios');
const moviesURL = 'https://api.tvmaze.com/shows'

// a function that return all the movies from the API
const getAllMoviesFromAPI = async () => {
    return (await axios.get(moviesURL));
}

module.exports = { getAllMoviesFromAPI }