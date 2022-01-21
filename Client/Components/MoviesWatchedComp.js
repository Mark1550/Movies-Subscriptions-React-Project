/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMovieByID } from '../DAL/moviesDAL'
import { checkIfHasSub, getSubById } from '../Utils/subscriptionsUtils'
import AddNewMovieToSubComp from './AddNewMovieToSubComp'

export default function MoviesWatchedComp(props) {
    const [MoviesArr, setMoviesArr] = useState()
    const [bool, setBool] = useState(false)
    const [showAdd, setshowAdd] = useState(false)

    // this useEffect is chcecking if the member has a subscription, and then build an array of moviesname and date
    useEffect(async () => {
        if (await checkIfHasSub(props.id)) {
            const sub = await getSubById(props.id)
            let arr = []
            for (let movie of sub.movies) {
                let obj = await getMovieByID(movie.movieId)
                let newObj = {
                    name: obj.name,
                    date: movie.date
                }
                arr.push(newObj)
            }
            setMoviesArr(arr)
        }
        else {
            if (props.refresh)
                props.cb()
            setMoviesArr([])
        }
    }, [bool, props.refresh, props.id])

    //"refresh" is a functin then "refreshes" all the page
    const refresh = () => {
        setshowAdd(!showAdd)
        setBool(!bool)
        props.cb()
    }

    //"moviesLister" is listing all the movies that the member has watched in a list
    let moviesLister = ''
    if (MoviesArr !== undefined)
        moviesLister = MoviesArr.map((movie, index) => <li key={index}><Link to={`/mainPage/movie/${movie.name}`}>{movie.name}</Link> {movie.date}</li>)

    return (
        <div className='moviesWatchedDiv'>
            <h3>Movies Watched</h3>
            <button className='subToNewMovie' onClick={() => setshowAdd(!showAdd)}>Subscribe To New Movie</button><br />
            <AddNewMovieToSubComp id={props.id} cb={refresh} show={showAdd} /><br />
            <ul>{moviesLister}</ul>
        </div>
    )
}
