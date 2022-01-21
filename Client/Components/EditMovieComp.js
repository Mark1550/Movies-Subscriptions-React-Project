/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMovieByID, updateMovieById } from '../DAL/moviesDAL'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'

export default function EditMovieComp() {
    const [Movie, setMovie] = useState()
    const [Name, setName] = useState()
    const [Genres, setGenres] = useState()
    const [Img, setImg] = useState()
    const [Premiered, setPremiered] = useState()
    const state = useSelector(state => state)
    const Navigate = useNavigate()
    const userId = useSelector(state => state.user.user._id)

    //this useEffect is loading the movie's data to the inputs
    useEffect(async () => {
        const movie = await getMovieByID(state.editMovie)
        let date = new Date(movie.premiered)
        date = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + date.getDate()
        setPremiered(date);
        setMovie(movie);
    }, [])

    // "update" is a function that takes all the client's inputs and updates the movie accordingly in the databasse
    const update = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            const arr = Genres?.split(",")
            const obj = { ...Movie, name: Name, geners: Genres ? arr : Movie.geners, image: Img, premiered: Premiered }
            await updateMovieById(obj, Movie._id)
            Navigate('/mainPage/movies/allMovies')//navigating back to "allMovies" page
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Movies</h2>
            <h3>Edit Movie:  {Movie?.name}</h3>
            <div className='editMovieDiv'>
                <strong>Name: </strong><input style={{ marginTop: '15px' }} type='text' defaultValue={Movie?.name} onChange={e => setName(e.target.value)} /><br />
                <strong>Genres: </strong><input type='text' defaultValue={Movie?.geners.toString()} onChange={e => setGenres(e.target.value)} /><br />
                <strong>Image URL: </strong><input type='text' defaultValue={Movie?.image} onChange={e => setImg(e.target.value)} /><br />
                <strong>Premiered: </strong><input type='date' defaultValue={Premiered} onChange={e => setPremiered(e.target.value)} /><br /><br />
                <button className='editDeleteBtns' onClick={update}>Update</button>
                <button className='editDeleteBtns' onClick={() => Navigate('/mainPage/movies/allMovies')}>Cancel</button>
            </div>
        </div>
    )
}
