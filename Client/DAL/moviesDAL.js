import axios from 'axios'

//moviesDAL has all the basic functions that talk to the server side in reggardes with movies data

const url = 'http://localhost:8001/movies'

const getAllMovies = async () => (await (await axios.get(url)).data)

const getMovieByID = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const updateMovieById = async (updatedMovie, id) => await axios.put(`${url}/${id}`, updatedMovie)

const addMovie = async (newMovie) => await axios.post(url, newMovie)

const deleteMovie = async (id) => await axios.delete(`${url}/${id}`)

export { getAllMovies, getMovieByID, updateMovieById, addMovie, deleteMovie }    