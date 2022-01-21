import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InnerEditUserComp from './InnerEditUserComp'

export default function EditUserComp() {
    const [UserJSON, setUserJSON] = useState({})
    const state = useSelector(state => state)

    // this usesEffect is saving the users data to show it's name in the top of the page
    useEffect(() => {
        setUserJSON(state.editUser.userJson);
    }, [])

    return (
        <div style={{textAlign:'center'}}>
        <h2>Users Management</h2>
            <h3>Edit User: {UserJSON.firstName} {UserJSON.lastName}</h3>
            <InnerEditUserComp user={state.editUser} />
        </div>
    )
}
