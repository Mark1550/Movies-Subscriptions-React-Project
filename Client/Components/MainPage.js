/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { checkIfAdmin, checkIfSessionTimeOut } from '../Utils/usersUtils'

export default function MainPage() {
    const [admin, setAdmin] = useState(false)
    const state = useSelector(state => state)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.user._id)

    //this usseEffect is checking if the user that is logged in is an admin and if it is then the "users management" button will show
    useEffect(async () => {
        const checkAdmin = await checkIfAdmin(state.user.user)
        setAdmin(checkAdmin)
    }, [])

    // "userManagement" is a function that redirects the client to the userMangemnt page and refreshes it 
    const userManagement = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            Navigate('/mainPage/userManagment/allUsers')
            dispatch({ type: "REFRESH" })
        }
        else
            Navigate('/')//navigating back to login page
    }

    // "gotoSubs" is a functin that redirects the client to the subscriptions page if the user has the permission to it
    const gotoSubs = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of state.permissions)
                if (per === "View Subscriptions")
                    bool = true
            bool ? Navigate('/mainPage/subscriptions/allMembers') : alert("You Don't Have The Permission To View The Subscriptions")
        }
        else
            Navigate('/')//navigating back to login page
    }

    // "gotoMovies" is a functin that redirects the client to the movies page if the user has the permission to it
    const gotoMovies = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of state.permissions)
                if (per === "View Movie")
                    bool = true
            bool ? Navigate('/mainPage/movies/allMovies') : alert("You Don't Have The Permission To View Movies")
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        state.user.user !== undefined ? <div className='mainPageDiv'>
            <header className='MainPageHeader'>
                <h2 className='mainPageTitle'>Movies - Subscriptions Website - {state.user.user.username}</h2>
                <button className='topBtn' onClick={gotoMovies}>Movies</button>
                <button className='topBtn' onClick={gotoSubs}>Subscriptions</button>
                {admin ? <button className='topBtn' onClick={userManagement}>Users Management</button> : null}
                <button className='topBtn' onClick={() => Navigate('/')}>Log Out</button>
            </header>

            <Outlet />
        </div> : <h1>Please Log In To See The Website</h1>
    )
}
