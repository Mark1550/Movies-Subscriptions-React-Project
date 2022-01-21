const { getAllUsersFromAPI } = require('../BL/membersBL')
const membersModel = require('../Models/membersModel')

//a function that gets all the members using the memebersModel
const getAllMembers = () => {
    return new Promise((resolve, reject) => {
        membersModel.find({}, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

// a function that gets a member by it's ID using the memebersModel
const getMemberById = (id) => {
    return new Promise((resolve, reject) => {
        membersModel.findById(id, (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data)
            }
        })
    })
}

// a function that adds a member to the database using the memebersModel
const addMember = (newMember) => {
    return new Promise((resolve, reject) => {
        const member = new membersModel(newMember)
        member.save((err) => {
            if (err)
                reject(err)
            else
                resolve("Member was added successfully")
        })
    })
}

// a function that updates a member in the database by it's ID using the memebersModel
const updateMember = (id, updatedMember) => {
    return new Promise((resolve, reject) => {
        membersModel.findByIdAndUpdate(id, updatedMember, (err) => {
            if (err)
                reject(err)
            else
                resolve("Member was updated successfully")
        })
    })
}

// a function that deletes a member by it's ID using the memebersModel
const deleteMember = (id) => {
    return new Promise((resolve, reject) => {
        membersModel.findByIdAndDelete(id, (err) => {
            if (err)
                reject(err)
            else
                resolve("Member was deleted successfully")
        })
    })
}

// a function that gets all the members from the database, delete them, get the new memebers from the API and loades them into the database
const getStartMembers = async () => {
    const members = await getAllMembers()
    for (const member of members)
        await deleteMember(member._id)
    const newMembers = await getAllUsersFromAPI()
    for (const newMember of newMembers.data) {
        const newObj = {
            name: newMember.name,
            email: newMember.email,
            city: newMember.address?.city
        }
        await addMember(newObj)
    }
}

module.exports = { getAllMembers, addMember, deleteMember, updateMember, getMemberById, getStartMembers }
