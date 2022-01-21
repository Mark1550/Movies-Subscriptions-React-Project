/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMovie } from '../DAL/moviesDAL';
import { checkIfSomeoneWatched, findMovieByName } from '../Utils/moviesUtils';
import { checkIfSessionTimeOut } from '../Utils/usersUtils';
import SubscriptionsWatchedComp from './SubscriptionsWatchedComp';

export default function MovieComp() {
    const { name } = useParams()
    const [Movie, setMovie] = useState({})
    const [Year, setYear] = useState(0)
    const [Geners, setGeners] = useState()
    const [imgUrl, setImageUrl] = useState()
    const [CheckIfWatched, setCheckIfWatched] = useState(false)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const permissions = useSelector(state => state.permissions)
    const userId = useSelector(state => state.user.user._id)

    //this useEffect is loading the movie to the page
    useEffect(async () => {
        setMovie(await findMovieByName(name));
    }, [])

    //this useEffect is loading the movie's info to the page
    useEffect(async () => {
        setYear(Movie.premiered?.slice(0, 4));
        setGeners('"' + Movie.geners?.join('", "') + '"');
        setImageUrl(Movie?.image);
        setCheckIfWatched(await checkIfSomeoneWatched(Movie?._id))
    }, [Movie])

    //"edit" is a function that redirects the client to the editMovie page if the user has the permission to do it
    const edit = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of permissions)
                if (per === 'Update Movie')
                    bool = true
            if (bool) {
                dispatch({ type: 'Save Movie For Edit', payload: Movie._id })
                Navigate('/mainPage/editMovie')//navigate to editMovie page
            } else
                alert("You Don't Have The Permission To Update Movie")
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"deleteAMovie" is a functino that deletes a movie if the client user has the permission to do it
    const deleteAMovie = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of permissions)
                if (per === 'Delete Movie')
                    bool = true
            if (bool) {
                await deleteMovie(Movie._id)
                Navigate('/mainPage/subscriptions/allMembers')
            } else
                alert("You Don't Have The Permission To Delete Movie")
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        <div className='memberDiv'>
            <h3>{Movie.name}, {Year}</h3>
            Geners: {Geners}<br /><br />
            <img src={imgUrl} alt={Movie.name} /><br />
            {CheckIfWatched ? <SubscriptionsWatchedComp movieId={Movie._id} /> : null}
            <button className='editDeleteBtns' onClick={edit}>Edit</button>
            <button className='editDeleteBtns' onClick={deleteAMovie}>Delete</button>
        </div>
    )
}
