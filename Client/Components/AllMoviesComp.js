/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllMovies } from '../DAL/moviesDAL'
import { searchMovies } from '../Utils/moviesUtils'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'
import SeperateMovieComp from './SeperateMovieComp'

export default function AllMoviesComp() {
    const [StartMovies, setStartMovies] = useState()
    const [SearchInput, setSearchInput] = useState()
    const [SearchedMovies, setSearchedMovies] = useState()
    const state = useSelector(state => state)
    const userId = useSelector(state => state.user.user._id)
    const dispatch = useDispatch()
    const Navigate=useNavigate()

    // this useEffect is loading all the starting movies before any search was made
    useEffect(async () => {
        const movies = await getAllMovies()
        setStartMovies(movies)
        setSearchedMovies(movies)
    }, [state.refresh])

    //this useEffect is loading all the movies after searching for them
    useEffect(async () => {
        setSearchedMovies(SearchedMovies)
    }, [state.refreshMovies])

    //"search" is a function that uses a function from the utils to find all the wanted movies and update the "allMovies" function
    const search = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            const searchResult = searchMovies(StartMovies, SearchInput)
            setSearchedMovies(searchResult);
            dispatch({ type: 'REFRESH MOVIES' })
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"moviesLister" is listing all the movies into the grid
    const moviesLister = SearchedMovies?.map((movie, index) => <SeperateMovieComp movie={movie} key={index} />)

    return (
        <div>
            <div className='searchBar'>Find Movie: <input className='searchInput' type='text' onChange={e => setSearchInput(e.target.value)} /><button className='editDeleteBtns' onClick={search}>Find</button></div><br />
            <div className='MoviesGrid'>
                {moviesLister}
            </div>
        </div>
    )
}
