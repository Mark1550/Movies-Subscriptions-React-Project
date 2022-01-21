/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../DAL/usersDAL'
import SeperateUserComp from './SeperateUserComp'

export default function AllUsersComp() {
    const [users, setUsers] = useState()
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    
    //this useEffect is loading all the users
    useEffect(async () => {
        setUsers(await getAllUsers())
    }, [state.refresh])

    //"usersLister" is listing all the users into the grid
    const usersLister = users?.users?.map((user, index) => <SeperateUserComp id={user._id} cb={() => dispatch({ type: "REFRESH" })} key={index} />)

    return (
        <div>
            <h2>Users Management</h2>
            <div className='MoviesGrid'>
                {usersLister}
            </div>
        </div>
    )
}
