import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteMember } from '../DAL/membersDAL'
import { deleteSub } from '../Utils/subscriptionsUtils'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'
import MoviesWatchedComp from './MoviesWatchedComp'

export default function SeperateMemberComp(props) {
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [City, setCity] = useState()
    const [refresh, setRefresh] = useState(false)
    const userId = useSelector(state => state.user.user._id)
    const permissions = useSelector(state => state.permissions)
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    //this useEffect is loading all the member's info to the page
    useEffect(() => {
        setName(props.member.name)
        setEmail(props.member.email)
        setCity(props.member.city)
    }, [refresh])

    //"Delete" is a function that deletes a member if the user has the permission to do it
    const Delete = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of permissions)
                if (per === 'Delete Subscriptions')
                    bool = true
            if (bool) {
                await deleteMember(props.member._id)
                await deleteSub(props.member._id)
                props.cb()
                setRefresh(!refresh)
            } else
                alert("You Don't Have The Permission To Delete Subscription")
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"edit" is a function that redirects the client to the editMember page if the user has the permission to do it
    const edit = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of permissions)
                if (per === 'Update Subscriptions')
                    bool = true
            if (bool) {
                dispatch({ type: 'Save Member For Edit', payload: props.member._id })
                Navigate('/mainPage/editMember') //navigate to editmember page
            } else
                alert("You Don't Have The Permission To Update Subscription")
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        <div className='SeperateMovie' style={{ backgroundColor: '#fc9292' }}>
            <h3>{Name}</h3>
            <strong>Email: </strong>{Email}<br />
            <strong>City: </strong>{City}<br /><br />
            <button className='editDeleteBtns' onClick={edit}>Edit</button>
            <button className='editDeleteBtns' style={{ backgroundColor: 'red' }} onClick={Delete}>Delete</button><br /><br />
            <MoviesWatchedComp refresh={refresh} cb={() => setRefresh(!refresh)} id={props.member?._id} />
        </div>
    )
}
