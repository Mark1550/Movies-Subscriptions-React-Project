import { getAllMembers } from "../DAL/membersDAL"

// a function that find the user by it's name
const findMemberByName = async (name) => {
    const members = await getAllMembers()
    const member = members.find((member) => member.name === name)
    return member
}
export { findMemberByName }