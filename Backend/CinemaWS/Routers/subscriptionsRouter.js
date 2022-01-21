const express = require('express')
const { getAllSubscriptions, getSubscriptionByID, addSubscription, updateSubscriptionById, deleteSubscription } = require('../DAL/subscriptionsDAL')

//creating a router using express
const router = express.Router()

//declering the route for the GET method | a function that gets all the subscriptions using the DAL's functions
router.route('/').get(async (req, res) => {
    try {
        const subscriptions = await getAllSubscriptions()
        return res.json(subscriptions)
    }
    catch (error) {
        return res.json(error)
    }
})

// declering the route for the GET method by id | a functoin that gets a subscriptoin by it's ID using the DAL's functions
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const subscription = await getSubscriptionByID(id)
        return res.json(subscription)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the POST method | a functoin that adds a subscription to the database using the DAL's functions
router.route('/').post(async (req, res) => {
    const newSubscription = req.body;
    const result = await addSubscription(newSubscription)
    return result
})

//declering the route for the PUT method | a function that updates a subscription in the database by it's ID using the DAL's functions
router.route('/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const updatedSubscription = req.body;
        const result = await updateSubscriptionById(updatedSubscription, id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the DELETE method | a function that deletes a subscriptions by it's ID using the DAL's functions 
router.route('/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteSubscription(id)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

module.exports = router;