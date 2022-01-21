/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { getMemberByID, updateMemberById } from '../DAL/membersDAL'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'

export default function EditMemberComp() {
    const state = useSelector(state => state)
    const [Member, setMember] = useState()
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [City, setCity] = useState()
    const Navigate = useNavigate()
    const userId = useSelector(state => state.user.user._id)

    //this useEffect is loading the member's info to the inputs
    useEffect(async () => {
        setMember(await getMemberByID(state.editMember));
    }, [])

    //"update" is a function that gets the new data from the client and updates the member's info accordingly
    const update = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            const obj = { ...Member, name: Name, email: Email, city: City }
            await updateMemberById(obj, state.editMember)
            Navigate('/mainPage/subscriptions/allMembers')//navigating back to "allMembers" page
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Subscriptions</h2>
            <h3>Edit Member: {Member?.name}</h3>
            <div className='EditMemeberDiv'>
                <strong>Name:</strong> <input type='text' defaultValue={Member?.name} onChange={e => setName(e.target.value)} /><br />
                <strong>Email:</strong> <input type='email' defaultValue={Member?.email} onChange={e => setEmail(e.target.value)} /><br />
                <strong>City:</strong> <input type='text' defaultValue={Member?.city} onChange={e => setCity(e.target.value)} /><br /><br />
                <button className='editDeleteBtns' onClick={update}>Update</button>
                <button className='editDeleteBtns' onClick={() => Navigate('/mainPage/subscriptions/allMembers')}>Cancel</button>
            </div>
        </div>
    )
}
