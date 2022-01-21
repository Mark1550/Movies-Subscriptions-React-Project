import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateAccountComp from './CreateAccountComp'
import MainPage from './MainPage'
import LogInComp from './LogInComp'
import MoviesComp from './MoviesComp'
import UserManagmentComp from './UserManagmentComp'
import AllUsersComp from './AllUsersComp'
import AddUserComp from './AddUserComp'
import EditUserComp from './EditUserComp'
import AllMoviesComp from './AllMoviesComp'
import AddMovieComp from './AddMovieComp'
import SubscriptionsComp from './SubscriptionsComp'
import AllMembersComp from './AllMembersComp'
import AddMemberComp from './AddMemberComp'
import EditMemberComp from './EditMemberComp'
import EditMovieComp from './EditMovieComp'
import MovieComp from './MovieComp'
import MemberComp from './MemberComp'

//"PlaceHolder" is a function that difiens all the "URL PATHS" for the website
export default function PlaceHolder() {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<LogInComp />} />
                <Route path='/CreateAccount' element={<CreateAccountComp />} />
                <Route path='/mainPage' element={<MainPage />} >
                    <Route path='movies' element={<MoviesComp />} >
                        <Route path='allMovies' element={<AllMoviesComp />} />
                        <Route path='addMovie' element={<AddMovieComp />} />
                    </Route>
                    <Route path='userManagment' element={<UserManagmentComp />} >
                        <Route path='allUsers' element={<AllUsersComp />} />
                        <Route path='addUser' element={<AddUserComp />} />
                    </Route>
                    <Route path='subscriptions' element={<SubscriptionsComp />} >
                        <Route path='allMembers' element={<AllMembersComp />} />
                        <Route path='addMember' element={<AddMemberComp />} />
                    </Route>
                    <Route path='editUser' element={<EditUserComp />} />
                    <Route path='editMember' element={<EditMemberComp />} />
                    <Route path='editMovie' element={<EditMovieComp />} />
                    <Route path='movie/:name' element={<MovieComp />} />
                    <Route path='member/:name' element={<MemberComp />} />
                </Route>
            </Routes>
        </div>
    )
}
