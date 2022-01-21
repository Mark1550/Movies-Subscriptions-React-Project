/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteMember } from '../DAL/membersDAL'
import { deleteSub } from '../Utils/subscriptionsUtils'
import { findMemberByName } from '../Utils/membersUtils'
import MoviesWatchedComp from './MoviesWatchedComp'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'

export default function MemberComp() {
    const { name } = useParams()
    const [Member, setMember] = useState({})
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [City, setCity] = useState()
    const [refresh, setRefresh] = useState(true)
    const userId = useSelector(state => state.user.user._id)
    const permissions = useSelector(state => state.permissions)
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    // this useEffect is loading the member to the page
    useEffect(async () => {
        setMember(await findMemberByName(name))
    }, [])

    //this useEffect is loading the member's info to the page
    useEffect(async () => {
        setName(Member.name)
        setEmail(Member.email)
        setCity(Member.city)
    }, [Member])

    //"Delete" is a function that deletes a member if the user has the permission to do it
    const Delete = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of permissions)
                if (per === 'Delete Subscriptions')
                    bool = true
            if (bool) {
                await deleteMember(Member._id)
                await deleteSub(Member._id)
                Navigate('/mainPage/movies/allMovies')//navigate back to allMovies page
            } else
                alert("You Don't Have The Permission To Delete Subscription")
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"edit" is a function that redirects the client to the editMember page if the user has the permission to do it
    const edit = async() => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of permissions)
                if (per === 'Update Subscriptions')
                    bool = true
            if (bool) {
                dispatch({ type: 'Save Member For Edit', payload: Member._id })
                Navigate('/mainPage/editMember')//navigate to editMember page
            } else
                alert("You Don't Have The Permission To Update Subscription")
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        <div className='memberDiv'>
            <h3>{Name}</h3>
            <strong>Email: </strong>{Email}<br />
            <strong>City: </strong>{City}<br /><br />
            <button className='editDeleteBtns' onClick={edit}>Edit</button>
            <button className='editDeleteBtns' onClick={Delete}>Delete</button><br /><br />
            <MoviesWatchedComp refresh={refresh} cb={() => setRefresh(false)} id={Member?._id} />
        </div>
    )
}
