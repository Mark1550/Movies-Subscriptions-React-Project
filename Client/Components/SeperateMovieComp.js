/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkIfSomeoneWatched, deleteMovieUtils } from '../Utils/moviesUtils'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'
import SubscriptionsWatchedComp from './SubscriptionsWatchedComp'

export default function SeperateMovieComp(props) {
    const [Movie, setMovie] = useState({})
    const [Year, setYear] = useState(0)
    const [Geners, setGeners] = useState()
    const [imgUrl, setImageUrl] = useState()
    const [CheckIfWatched, setCheckIfWatched] = useState(false)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const permissions = useSelector(state => state.permissions)
    const userId = useSelector(state => state.user.user._id)

    //this useEffect is loading all the movie's info to the page
    useEffect(async () => {
        setMovie(props.movie)
        setYear(props.movie.premiered.slice(0, 4));
        setGeners('"' + props.movie.geners.join('", "') + '"');
        setImageUrl(props.movie.image);
        setCheckIfWatched(await checkIfSomeoneWatched(props.movie._id))
    }, [props.movie])

    //"edit" is a function that redirects the client to the editMovie page if the user has the permission to do it
    const edit = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of permissions)
                if (per === 'Update Movie')
                    bool = true
            if (bool) {
                dispatch({ type: 'Save Movie For Edit', payload: props.movie._id })
                Navigate('/mainPage/editMovie')//navigate to editmovie page
            } else
                alert("You Don't Have The Permission To Update Movie")
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"deleteAMovie" is a functino that deletes a movie if the client user has the permission to do it
    const deleteAMovie = async () => {
        let bool = false
        for (let per of permissions)
            if (per === 'Delete Movie')
                bool = true
        if (bool) {
            await deleteMovieUtils(props.movie._id)
            dispatch({ type: 'REFRESH' })
        } else
            alert("You Don't Have The Permission To Delete Movie")
    }

    return (
        <div className='SeperateMovie'>
            <h3>{Movie.name}, {Year}</h3>
            <h5 className='Geners'>Geners: {Geners}</h5><br />
            <img src={imgUrl} alt={Movie.name} /><br />
            <button className='editDeleteBtns' onClick={edit}>Edit</button>
            <button className='editDeleteBtns' style={{ backgroundColor: 'red' }} onClick={deleteAMovie}>Delete</button>
            {CheckIfWatched ? <SubscriptionsWatchedComp movieId={Movie._id} /> : null}
        </div>
    )
}
