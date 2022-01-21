import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../DAL/usersDAL'
import { checkIfSessionTimeOut, checkIfUsernameExist, convertArrToPermissions, MoviesPermissionsPressed, SubscriptionsPermissionsPressed } from '../Utils/usersUtils'

export default function AddUserComp() {
    const [PermissionsSTRINGS] = useState(['View Subscriptions', 'Create Subscriptions', 'Delete Subscriptions', 'Update Subscriptions', 'View Movie', 'Create Movie', 'Delete Movie', 'Update Movie'])
    const [PermissionsList, setPermissionsList] = useState([false, false, false, false, false, false, false, false])
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [UserName, setUserName] = useState('')
    const [SessionTimeOut, setSessionTimeOut] = useState(0)
    const [refresh, setRefresh] = useState(true)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.user._id)

    // "useEffect" is checking everytime wich permission is pressed and according to that it "checking" the "view" permissions
    useEffect(() => {
        const arr = [...PermissionsList]
        if (SubscriptionsPermissionsPressed(PermissionsList)) {
            arr[0] = true
            setPermissionsList(arr)
        }
        if (MoviesPermissionsPressed(PermissionsList)) {
            arr[4] = true
            setPermissionsList(arr)
        }
    }, [refresh])

    //"change Permission" is saving the client's input in the permissions part 
    const changePermission = (e) => {
        const arr = [...PermissionsList]
        e.target.checked ? arr[e.target.name] = true : arr[e.target.name] = false
        setPermissionsList(arr)
        setRefresh(!refresh)
    }

    //"save" is checking first if the username exist and if not it saves the new user in the database.
    const save = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = await checkIfUsernameExist(UserName)
            if (!bool) {
                const newArr = convertArrToPermissions(PermissionsList)
                var today = new Date()
                const obj = {
                    firstName: FirstName,
                    lastName: LastName,
                    createdDate: today,
                    sessionTimeOut: SessionTimeOut,
                    username: UserName,
                    password: '',
                    permissions: newArr
                }
                Navigate('/mainPage/userManagment/allUsers')// navigating back to "allUsers" page
                dispatch({ type: "REFRESH" })
                await addUser(obj)
            } else
                alert('This Username is takken')
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"permissionsLister" is listing constantly the permissions checkboxes acccordingly to useEffect's checking
    const PermissionLister = PermissionsSTRINGS.map((per, index) => <span key={index}><input type='checkbox' name={index} onChange={changePermission} checked={PermissionsList[index] ? true : false} />{per}<br /></span>)

    return (
        <div>
            <h2>Add New User</h2>
            <div className='addUserDiv'>
                <strong>First Name: </strong><input type='text' onChange={e => setFirstName(e.target.value)} /><br />
                <strong>Last Name: </strong><input type='text' onChange={e => setLastName(e.target.value)} /><br />
                <strong>User Name: </strong><input type='text' onChange={e => setUserName(e.target.value)} /><br />
                <strong>Session Time Out: </strong><input type='number' onChange={e => setSessionTimeOut(e.target.value)} /><br />
                <strong>Permissions:</strong><br />
                {PermissionLister}
                <button className='editDeleteBtns' onClick={save}>Save</button>
                <button className='editDeleteBtns' onClick={() => Navigate('/mainPage/userManagment/allUsers')}>Cancel</button>
            </div>
        </div>
    )
}
