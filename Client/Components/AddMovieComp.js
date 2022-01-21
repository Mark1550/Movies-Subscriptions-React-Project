import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addMovie } from '../DAL/moviesDAL'
import { checkIfSessionTimeOut } from '../Utils/usersUtils'

export default function AddMovieComp() {
    const [Name, setName] = useState('')
    const [Genres, setGenres] = useState('')
    const [Img, setImg] = useState('')
    const [Premiered, setPremiered] = useState('')
    const Navigate = useNavigate()
    const userId = useSelector(state => state.user.user._id)

    // "save" is a function that validates the inputs and build a new movie object and saves it in the database
    const save = async () => {
        if (await checkIfSessionTimeOut(userId)) {
            if (Name !== '' && Genres !== '' && Img !== '' && Premiered !== '') {
                let genresArr = Genres?.split(",")
                let obj = {
                    name: Name,
                    geners: genresArr,
                    image: Img,
                    premiered: Premiered
                }
                Navigate('/mainPage/movies/allMovies') //navigating back to the allMovies page
                await addMovie(obj)
            }
            else
                alert('Please fill all the fields')//alert if not all the fields were filled
        }
        else
            Navigate('/')//navigating back to login page
    }

    return (
        <div>
            <h3>Add New Movie</h3>
            <div className='addMovieDiv'>
                <div style={{ marginTop: '5px' }}>
                    <strong>Name: </strong><input type='text' onChange={e => setName(e.target.value)} /><br />
                    <strong>Genres: </strong><input type='text' onChange={e => setGenres(e.target.value)} /><br />
                    <strong>Img URL: </strong><input type='text' onChange={e => setImg(e.target.value)} /><br />
                    <strong>Premiered: </strong><input type='date' onChange={e => setPremiered(e.target.value)} /><br />
                    <button className='editDeleteBtns' onClick={save}>Save</button>
                    <button className='editDeleteBtns' onClick={() => Navigate('/mainPage/movies/allMovies')}>cancel</button>
                </div>
            </div>
        </div>
    )
}
