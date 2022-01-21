/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../DAL/moviesDAL'
import { AddMovieToSub, getSubById } from '../Utils/subscriptionsUtils'
import { findNotWtchedMovies } from '../Utils/moviesUtils'
import { useSelector } from 'react-redux'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'
import { useNavigate } from 'react-router-dom'

export default function AddNewMovieToSubComp(props) {
    const [Movies, setMovies] = useState()
    const [Movie, setMovie] = useState()
    const [Date, setDate] = useState()
    const [Id, setId] = useState()
    const [bool, setbool] = useState(true)//true=first movie, false= not first
    const userId = useSelector(state => state.user.user._id)
    const Navigate = useNavigate()

    //every time the function is loading and gets differnt "props.show" value the function is loading all the movies that the member didnt wathed into the select element
    useEffect(async () => {
        const allMovies = await getAllMovies()
        const sub = await getSubById(props.id)
        const watchedMovies = sub?.movies
        let restMovies = []
        if (watchedMovies !== undefined) {
            setbool(false)
            restMovies = await findNotWtchedMovies(watchedMovies)
            setMovies(restMovies)
        } else {
            setMovies(allMovies)//if the member didn't watch any movies that load all the movies to the select elemnt
            setbool(true)
        }
        setId(props.id)
    }, [props.show])

    //"subscribe" is a function that adds the choosen movie to the member's "movie" array after validation of the inputs
    const Subscribe = async () => {
        const movie = {
            movieId: Movie,
            date: Date
        }
        if (await checkIfSessionTimeOut(userId)) {
            if ((Movie !== undefined) && (Date !== undefined)) {
                if (bool) {
                    props.cb()
                    await AddMovieToSub(Id, movie)
                } else {
                    await AddMovieToSub(Id, movie)
                    props.cb()
                }
            }
            else if (Movie !== undefined)
                alert('Please Enter Date')
            else
                alert('Please Choose Movie')
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"movieLister" using the "map" function to list all the options to the select element constaining all the movies that the member didn't watch
    const movieLister = Movies?.map((movie, index) => <option key={index} value={movie._id}>{movie.name}</option>)

    return (
        props.show ? <div className='SubToMovieDiv'>
            <strong>Add A New Movie</strong><br />
            <select className='MoviesSelect' onChange={e => setMovie(e.target.value)}>
                <option></option>
                {movieLister}
            </select><br />
            Date: <input type='date' onChange={e => setDate(e.target.value)} /><br />
            <button className='subBtn' onClick={Subscribe}>Subscribe</button>
        </div> : null
    )
}
