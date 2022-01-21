import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'

export default function MoviesComp() {
    const Navigate = useNavigate()
    const permissions = useSelector(state => state.permissions)
    const userId = useSelector(state => state.user.user._id)

    //"addMovie" is a function that redirect the client to the addmovie page only if the user has the permission to do it
    const addMovie = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of permissions)
                if (per === 'Create Movie')
                    bool = true
            bool ? Navigate('/mainPage/movies/addMovie') : alert("You Don't Have The Permission To Add Movie")
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h2>Movies</h2>
            <button className='seconderyBtns' onClick={() => Navigate('/mainPage/movies/allMovies')}>All Movie</button>
            <button className='seconderyBtns' onClick={addMovie}>Add Movie</button>
            <Outlet />
        </div>
    )
}
