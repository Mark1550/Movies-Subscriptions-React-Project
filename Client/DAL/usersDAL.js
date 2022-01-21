import axios from 'axios'

//usersDAL has all the basic functions that talk to the server side in reggardes with Users data

const url = 'http://localhost:8001/users'

const getAllUsers = async () => ((await axios.get(url)).data)

const getUserByID = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const updateUserById = async (updatedUser, id) => await axios.put(`${url}/${id}`, updatedUser)

const addUser = async (newUser) => await axios.post(url, newUser)

const deleteUser = async (id) => await axios.delete(`${url}/${id}`)

export { getAllUsers, getUserByID, updateUserById, addUser, deleteUser }    
