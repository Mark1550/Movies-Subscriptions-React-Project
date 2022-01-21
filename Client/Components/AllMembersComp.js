/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { getAllMembers } from '../DAL/membersDAL';
import SeperateMemberComp from './SeperateMemberComp';

export default function AllMembersComp() {
    const [Members, setMembers] = useState()
    const [bool, setBool] = useState(false)
    
    //"useEffect" is loading all the members 
    useEffect(async () => {
        setMembers(await getAllMembers());
    }, [bool])

    //"membersLister" is listing all the members into the grid
    const membersLister = Members?.map((member, index) => <SeperateMemberComp key={index} member={member} cb={() => setBool(!bool)} />)

    return (
        <div className='MoviesGrid'>
            {membersLister}
        </div>
    )
}
