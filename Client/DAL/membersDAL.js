import axios from 'axios'

//membersDAL has all the basic functions that talk to the server side in reggardes with members data

const url = 'http://localhost:8001/members'

const getAllMembers = async () => (await (await axios.get(url)).data)

const getMemberByID = async (id) => (await (await axios.get(`${url}/${id}`)).data)

const updateMemberById = async (updatedMember, id) => await axios.put(`${url}/${id}`, updatedMember)

const addMember = async (newMember) => await axios.post(url, newMember)

const deleteMember = async (id) => await axios.delete(`${url}/${id}`)

export { getAllMembers, getMemberByID, updateMemberById, addMember, deleteMember }    