import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUserById } from '../DAL/usersDAL'
import { checkIfPasswordExist, checkIfSessionTimeOut, checkIfUsernameExist, findID, findUserByUserName } from '../Utils/usersUtils'

export default function CreateAccountComp() {
    const navigate = useNavigate()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const userId = useSelector(state => state.user.user._id)

    //this  function is validating all the inputs from the client and if it all valid then it saves the new password in the database
    const checkAndSend = async () => {
        const oldUser = await findUserByUserName(username)
        const newObj = {
            user: { username: username, password: password },
            userJson: { ...oldUser.userJson },
            permissions: { ...oldUser.permissions }
        }
        if (await checkIfSessionTimeOut(userId)) {
            if (await checkIfUsernameExist(username)) {  //validating the username
                const id = await findID(username)
                if (await checkIfPasswordExist(id))  //validating the password
                    alert('This User Already Exists')
                else {
                    await updateUserById(newObj, id)
                    navigate('/')   //navigating back to login
                }
            } else
                alert('The Username Is Incorrect')
        }
        else
            navigate('/')//navigating back to login page
    }
    
    return (
        <div className='loginPage'>
            <h2 className='loginTitle'>Movies - Subscriptions Website</h2>
            <div className='loginDiv'>
                <h4 className='logInHeader'>Create an account</h4>
                User name: <input type='text' onChange={e => setUserName(e.target.value)} /><br />
                Password: <input type='password' onChange={e => setPassword(e.target.value)} /><br />
                <button className='loginBtn' onClick={checkAndSend}>Create</button>
                <button className='loginBtn' onClick={() => navigate('/')}>Cancel</button><br />
            </div>
        </div>
    )
}
