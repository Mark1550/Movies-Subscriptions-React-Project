import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUserById } from '../DAL/usersDAL'
import { checkIfSessionTimeOut, convertArrToPermissions, convertPermissionsToArr, MoviesPermissionsPressed, SubscriptionsPermissionsPressed } from '../Utils/usersUtils'

export default function InnerEditUserComp(props) {
    const Navigate = useNavigate()
    const [User, setUser] = useState({})
    const [UserJSON, setUserJSON] = useState({})
    const [Permissions, setPermissions] = useState({})
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [UserName, setUserName] = useState('')
    const [SessionTimeOut, setSessionTimeOut] = useState(0)
    const [PermissionsList, setPermissionsList] = useState([false, false, false, false, false, false, false, false])
    const [PermissionsSTRINGS] = useState(['View Subscriptions', 'Create Subscriptions', 'Delete Subscriptions', 'Update Subscriptions', 'View Movie', 'Create Movie', 'Delete Movie', 'Update Movie'])
    const [PermissionsBOOL, setPermissionsBOOL] = useState([])
    const [refresh, setrefresh] = useState([])
    const userId = useSelector(state => state.user.user._id)

    //this useEffect is loading all the user's data in the inputs
    useEffect(() => {
        const editUser = props.user;
        setUser(editUser.user);
        setUserJSON(editUser.userJson);
        setPermissions(editUser.permissions.permissions);
        const arr = convertPermissionsToArr(editUser.permissions.permissions)
        setPermissionsBOOL(arr)
        setPermissionsList(arr)
    }, [])

    //this useEffect is checking constantly the permission to "check" the "view" permissoin accordingly
    useEffect(() => {
        const arr = [...PermissionsBOOL]
        if (SubscriptionsPermissionsPressed(PermissionsBOOL)) {
            arr[0] = true
            setPermissionsBOOL(arr)
            setPermissionsList(arr)
        }
        if (MoviesPermissionsPressed(PermissionsBOOL)) {
            arr[4] = true
            setPermissionsBOOL(arr)
            setPermissionsList(arr)
        }
    }, [refresh])

    //"update" is the function that gets all the client's input and updated the user data in the database acordingly
    const update = async () => {
        const newArr = convertArrToPermissions(PermissionsList)
        const newObj = {
            user: {
                username: UserName ? UserName : User.username,
                password: User.password,
            },
            userJson: {
                firstName: FirstName ? FirstName : UserJSON.firstName,
                lastName: LastName ? LastName : UserJSON.lastName,
                createdDate: UserJSON.createdDate,
                sessionTimeOut: SessionTimeOut ? SessionTimeOut : UserJSON.sessionTimeOut,
            },
            permissions: {
                id: Permissions.id,
                permissions: newArr ? newArr : Permissions.permissions
            }
        }
        if (await checkIfSessionTimeOut(userId)) {
            await updateUserById(newObj, User._id)
            Navigate('/mainPage/userManagment/allUsers')//navigating back to "allUsers" page}
        }
        else
            Navigate('/')//navigating back to login page
    }

    //"change Permission" is saving the client's input in the permissions part 
    const changePermission = (e) => {
        const arr = [...PermissionsList]
        e.target.checked ? arr[e.target.name] = true : arr[e.target.name] = false
        setPermissionsList(arr)
        setPermissionsBOOL(arr)
        setrefresh(!refresh)
    }

    // "permissionLister" is listing all the permission checkboxes in the page accordingly to the useEffect's checking
    let PermissionLister = ''
    if (PermissionsBOOL[0] !== undefined)
        PermissionLister = PermissionsSTRINGS.map((per, index) => <span key={index}><input type='checkbox' name={index} onChange={changePermission} checked={PermissionsBOOL[index] ? true : false} />{per}<br /></span>)

    return (
        <div className='editUserDiv'>
            <strong>First Name: </strong><input type='text' defaultValue={UserJSON.firstName} onChange={e => setFirstName(e.target.value)} /><br />
            <strong>Last Name: </strong><input type='text' defaultValue={UserJSON.lastName} onChange={e => setLastName(e.target.value)} /><br />
            <strong>User Name: </strong><input type='text' defaultValue={User.username} onChange={e => setUserName(e.target.value)} /><br />
            <strong>Session Time Out: </strong><input type='number' defaultValue={UserJSON.sessionTimeOut} onChange={e => setSessionTimeOut(e.target.value)} /><br />
            <strong>Created Data: </strong>{UserJSON.createdDate}<br />
            <strong>Permissions:</strong><br />
            {PermissionLister}
            <button className='editDeleteBtns' onClick={update}>Update</button>
            <button className='editDeleteBtns' onClick={() => Navigate('/mainPage/userManagment/allUsers')}>Cancel</button>
        </div>
    )
}
