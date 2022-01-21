/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { checkWhoWatched } from '../Utils/moviesUtils';

export default function SubscriptionsWatchedComp(props) {
    const [watchedArr, setwatchedArr] = useState([])

    //this useEffect is loading all the members that watched this movie
    useEffect(async () => {
        const arr = await checkWhoWatched(props.movieId)
        setwatchedArr(arr);
    }, [])

    //"watchedLister" is listing all the members that watched the movie
    const watchedLister = watchedArr?.map((member, index) => <li key={index}><Link to={`/mainPage/member/${member.name}`}>{member.name}</Link>, {member.date} </li>)

    return (
        <div className='subsWatched'>
            <h3 className='subsWatchedTitle'>Subscriptions Watched </h3><br />
            <ul>
                {watchedLister}
            </ul>
        </div>
    )
}
