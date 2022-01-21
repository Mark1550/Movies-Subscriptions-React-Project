import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addMember } from '../DAL/membersDAL'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'

export default function AddMemberComp() {
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [City, setCity] = useState()
    const Navigate = useNavigate()
    const userId = useSelector(state => state?.user.user._id)

    //"save" function that validetsthe input and builds a new object containing the new member's information and saves it in the database
    const save = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            if (Name !== undefined && Email !== undefined && City !== undefined) {
                const obj = {
                    name: Name,
                    email: Email,
                    city: City,
                }
                Navigate('/mainPage/subscriptions/allMembers')//navigating back to allMembers page
                await addMember(obj)
            }
            else
                alert('Please fill all the fields')//alert if not all the fields were filled
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        <div>
            <h3>Add New Member</h3>
            <div className='addMemberDiv'>
                <div style={{ marginTop: '7px' }}>
                    Name: <input typr='text' onChange={e => setName(e.target.value)} /><br />
                    Email: <input typr='email' onChange={e => setEmail(e.target.value)} /><br />
                    City: <input typr='text' onChange={e => setCity(e.target.value)} /><br /><br />
                    <button className='editDeleteBtns' onClick={save}>Save</button>
                    <button className='editDeleteBtns' onClick={() => Navigate('/mainPage/subscriptions/allMembers')}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
