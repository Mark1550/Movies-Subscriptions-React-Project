import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function UserManagmentComp() {
    const Navigate = useNavigate()

    //this function is used only to navigate between allusers page and adduser page
    return (
        <div style={{margin:'auto',textAlign:'center'}}>
            <button className='seconderyBtns' onClick={() => Navigate('/mainPage/userManagment/allUsers')}>All Users</button>
            <button className='seconderyBtns' onClick={() => Navigate('/mainPage/userManagment/addUser')}>Add User</button>
            <Outlet />
        </div>
    )
}
