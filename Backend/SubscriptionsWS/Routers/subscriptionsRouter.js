const express = require('express')
const subscriptionsDAL = require('../DAL/subscriptionsDAL')

//creating a router using express
const router = express.Router()

//declering the route for the GET method | a function that gets all the subscriptions using the DAL's functions
router.route('/').get(async (req, res) => {
    try {
        const subscriptions = await subscriptionsDAL.getAllSubscriptions();
        return res.json(subscriptions)
    }
    catch (error) {
        return res.json(error)
    }
})

// declering the route for the GET method by id | a functoin that gets a subscription by it's ID using the DAL's functions
router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const subscription = await subscriptionsDAL.getSubscriptionById(id)
        return (subscription)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the POST method | a functoin that adds a subscription to the database using the DAL's functions
router.route('/').post(async (req, res) => {
    const newSubscription = req.body;
    const result = await subscriptionsDAL.addSubscription(newSubscription).catch(err => console.log(err))
    return res.json(result)
})

//declering the route for the PUT method | a function that updates a subscription in the database by it's ID using the DAL's functions
router.route('/:id').put(async (req, res) => {
    const memberId = req.params.id;
    const allSubs = await subscriptionsDAL.getAllSubscriptions()
    const subscriptionToUpdate = allSubs.find((sub) => sub.memberId === memberId)
    const id = subscriptionToUpdate._id.valueOf()
    try {
        const updatedSubscription = req.body;
        const result = await subscriptionsDAL.updateSubscription(id, updatedSubscription)
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

//declering the route for the DELETE method | a function that deletes a subscription by it's ID using the DAL's functions
router.route('/:id').delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await subscriptionsDAL.deleteSubscription(id);
        return res.json(result)
    }
    catch (error) {
        return res.json(error)
    }
})

module.exports = router;