/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserByID, deleteUser } from '../DAL/usersDAL';
import { checkIfAdmin, checkIfSessionTimeOut } from '../Utils/usersUtils';

export default function SeperateUserComp(props) {
    const [User, setUser] = useState({})
    const [Permissions, setPermissions] = useState()
    const [UserJSON, setUserJSON] = useState({})
    const [Admin, setAdmin] = useState()
    const [date, setDate] = useState()
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const userId = useSelector(state => state.user.user._id)

    //this useEffect is loading all the user's info to the function's states
    useEffect(async () => {
        const id = props.id
        const user = await getUserByID(id)
        setAdmin(await checkIfAdmin(user.user))
        setUser(user.user)
        setPermissions(user.permissions)
        setUserJSON(user.userJson)
        let newDate = new Date(user.userJson.createdDate)
        setDate(newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear());
    }, [props.id, state.refresh])

    //"gotoEdit" is a function that redirects the client to the editUser page
    const gotoEdit = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            dispatch({ type: "Save User For Edit", payload: { user: User, userJson: UserJSON, permissions: Permissions } })
            Navigate('/mainPage/editUser')
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"DeleteUser" is deleting the choosen user
    const DeleteUser = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            await deleteUser(User._id)
            props.cb()
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"permissionLister" is listing all the permissions to the page
    const permissionsLister = Permissions?.permissions.map((permission, index) => <li key={index}>{permission}</li>)

    return (
        <div className='seperateUserDiv'>
            <strong>Name: </strong>{UserJSON?.firstName} {UserJSON?.lastName}<br />
            <strong>User Name: </strong>{User?.username}<br />
            <strong>Session Time Out: </strong>{UserJSON?.sessionTimeOut}<br />
            <strong>Created Date: </strong>{date}<br />
            <strong>Permissions: </strong><ul>{permissionsLister}</ul><br />
            <button className='editDeleteBtns' onClick={gotoEdit}>Edit</button>
            {!Admin ? <button className='editDeleteBtns' style={{ backgroundColor: 'red' }} onClick={DeleteUser}>Delete</button> : null}
        </div>
    )
}
