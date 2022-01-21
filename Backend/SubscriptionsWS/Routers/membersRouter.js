const express = require('express')
const membersDAL = require('../DAL/membersDAL') 

//creating a router using express
const router = express.Router()

//declering the route for the GET method | a function that gets all the members using the DAL's functions
router.route('/').get(async (req, res) => {
    try {
        const members = await membersDAL.getAllMembers();
        return res.json(members)
    }
    catch (error) {
        return res.json(error)
    }
})

// declering the route for the GET method by id | a functoin that gets a member by it's ID using the DAL's functions
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const member = await membersDAL.getMemberById(id)
        // console.log("asdfas",member);
        return res.json(member)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the POST method | a functoin that adds a member to the database using the DAL's functions
router.route('/').post(async (req, res) => {
    const newMember = req.body;
    const result = await membersDAL.addMember(newMember).catch(err => console.log(err))
    return res.json(result)
})

//declering the route for the PUT method | a function that updates a member in the database by it's ID using the DAL's functions
router.route('/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMember = req.body;
        const result = await membersDAL.updateMember(id, updatedMember)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the DELETE method | a function that deletes a member by it's ID using the DAL's functions
router.route('/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await membersDAL.deleteMember(id);
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

module.exports = router;