import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'

export default function SubscriptionsComp() {
    const Navigate = useNavigate()
    const permissions = useSelector(state => state.permissions)
    const userId = useSelector(state => state.user.user._id)

    // "addMember" is naigating the clint to the addMember page if the user has the permission to do it
    const addMember =async () => {
        if (await checkIfSessionTimeOut(userId)) {
            let bool = false
            for (let per of permissions)
                if (per === 'Create Subscriptions')
                    bool = true
            bool ? Navigate('/mainPage/subscriptions/addMember') : alert("You Don't Have The Permission To Add Member")
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h2>Subscriptions</h2>
            <button className='seconderyBtns' onClick={() => Navigate('/mainPage/subscriptions/allMembers')}>All Members</button>
            <button className='seconderyBtns' onClick={addMember}>Add Member</button>
            <Outlet />
        </div>
    )
}
