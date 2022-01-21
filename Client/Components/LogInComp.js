import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByID } from '../DAL/usersDAL'
import { checkIfExist, checkIfSessionTimeOut, findID } from '../Utils/usersUtils'


export default function LogInComp() {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const userId = useSelector(state => state.user.user?._id)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //"CheckAndSend" is the function that validates the client's inputs and if it's valid then it logges the user in.
    const CheckAndSend = async () => {
        const user = {
            username: username,
            password: password ? password : ''
        }
        const id = await findID(username)
        if (await checkIfSessionTimeOut(id)) {
            if (await checkIfExist(user)) {//validateing inputs
                if (user.password === '')
                    alert('This user has not been created yet')
                else {
                    const user = await getUserByID(id)
                    dispatch({ type: "Save User", payload: user })//saving the user's data in redux
                    dispatch({ type: "Save Permissions", payload: user.permissions.permissions })//saving the permission data in redux
                    navigate('/mainPage')//navigating to mainpage
                }
            } else
                alert('The Username Or Password Is Incorrect')
        }
        else
            alert("The user is fired!")
    }

    return (
        <div className='loginPage'>
            <h2 className='loginTitle'>Movies - Subscriptions Website</h2>
            <div className='loginDiv'>
                <h4 className='logInHeader'>Please Log-in</h4>
                User name: <input type='text' onChange={e => setUserName(e.target.value)} /><br />
                Password: <input type='password' onChange={e => setPassword(e.target.value)} /><br />
                <button className='loginBtn' onClick={CheckAndSend}>Login</button><br />
                New User? <Link to={'CreateAccount'}>Create New Account</Link>
            </div>
        </div>
    )
}